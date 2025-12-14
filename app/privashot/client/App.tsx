/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { findSensitiveInfo as geminiFindSensitiveInfo } from "./services/geminiService"; // Renamed to avoid conflict
import {
  UploadIcon,
  DownloadIcon,
  TrashIcon,
  UndoIcon,
  RedoIcon,
  SparklesIcon,
  LoaderIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  ChatBubbleIcon,
} from "./icons";

// ----------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// ----------------------------------------------------------------------

type AppState = "initial" | "editing";

type OriginalImageInfo = {
  file: File;
  url: string;
  width: number;
  height: number;
};

interface ManualRedaction {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AiSuggestion extends ManualRedaction {
  type: string;
  confidence: number;
  text: string;
}

// Drawing operation threshold (pixels)
const SCROLL_THRESHOLD = 8;

// Touch hit slop (screen pixels) to make selecting boxes easier
const HIT_SLOP_SCREEN_PX = 20;

// ----------------------------------------------------------------------
// 2. HELPER FUNCTIONS
// ----------------------------------------------------------------------

// Helper Function: Check for significant overlap between two boxes
const hasSignificantOverlap = (
  box1: { x: number; y: number; width: number; height: number },
  box2: { x: number; y: number; width: number; height: number },
): boolean => {
  const x1 = Math.max(box1.x, box2.x);
  const y1 = Math.max(box1.y, box2.y);
  const x2 = Math.min(box1.x + box1.width, box2.x + box2.width);
  const y2 = Math.min(box1.y + box1.height, box2.y + box2.height);

  if (x1 < x2 && y1 < y2) {
    const intersectionArea = (x2 - x1) * (y2 - y1);
    const box1Area = box1.width * box1.height;
    const box2Area = box2.width * box2.height;
    const minArea = Math.min(box1Area, box2Area);

    // If the intersection covers more than 30% of the smaller box area,
    // we consider them to be overlapping/conflicting.
    return intersectionArea / minArea > 0.3;
  }
  return false;
};

// Helper Function: Merging multiple AI results (Consensus logic)
const mergeSuggestions = (
  allSuggestions: Omit<AiSuggestion, "id">[][],
): Omit<AiSuggestion, "id">[] => {
  if (allSuggestions.length === 0) return [];

  const flattened = allSuggestions.flat();
  const MERGE_THRESHOLD = 10;
  const merged: Omit<AiSuggestion, "id">[] = [];

  for (const newBox of flattened) {
    let isDuplicate = false;

    for (const existingBox of merged) {
      const xDiff = Math.abs(newBox.x - existingBox.x);
      const yDiff = Math.abs(newBox.y - existingBox.y);
      const wDiff = Math.abs(newBox.width - existingBox.width);
      const hDiff = Math.abs(newBox.height - existingBox.height);

      // Check for overlap and similarity in size/position/type
      if (
        xDiff < MERGE_THRESHOLD &&
        yDiff < MERGE_THRESHOLD &&
        wDiff < MERGE_THRESHOLD &&
        hDiff < MERGE_THRESHOLD &&
        newBox.type === existingBox.type
      ) {
        // Use the box with higher confidence
        if (newBox.confidence > existingBox.confidence) {
          Object.assign(existingBox, newBox);
        }
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      merged.push(newBox);
    }
  }

  return merged;
};

// Helper Function: Calculates distance between two points
const calculateDistance = (
  p1: { x: number; y: number },
  p2: { x: number; y: number },
): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

// Helper Function: Draws a rounded rectangle on a canvas
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

// ----------------------------------------------------------------------
// 3. MAIN APPLICATION COMPONENT
// ----------------------------------------------------------------------

export default function App() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [originalImage, setOriginalImage] = useState<OriginalImageInfo | null>(
    null,
  );
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiRan, setAiRan] = useState(false);

  // State for showing feedback button
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);

  // History state for undo/redo
  const [redactionHistory, setRedactionHistory] = useState<ManualRedaction[][]>(
    [[]],
  );
  const [historyIndex, setHistoryIndex] = useState(0);
  const currentRedactions = Array.isArray(redactionHistory[historyIndex])
    ? redactionHistory[historyIndex]
    : [];

  // AI suggestions state
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestion[]>([]);
  const [selectedRedactionId, setSelectedRedactionId] = useState<string | null>(
    null,
  );

  // Manual Mode Toggle State
  const [isManualMode, setIsManualMode] = useState(false);

  // Dragging state for existing redactions
  const [isDraggingRedaction, setIsDraggingRedaction] = useState(false);
  const [liveDraggedRedaction, setLiveDraggedRedaction] =
    useState<ManualRedaction | null>(null); // For visual feedback during drag
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  ); // Offset from click to redaction corner

  // Tracks the ID of the redaction that was initially clicked (potential drag)
  const clickedRedactionIdRef = useRef<string | null>(null);
  // Tracks if a deletion was just handled by the X button
  const deletionHandledRef = useRef<boolean>(false);

  // Controls the AI suggestions modal
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  // Scale ratio for converting screen coords to image coords
  const [scaleRatio, setScaleRatio] = useState({ x: 1, y: 1 });

  // Coordinates of the box being currently drawn
  const [currentDrawingBox, setCurrentDrawingBox] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  // Tracks if drawing has actively started (i.e., passed the SCROLL_THRESHOLD)
  const [isDrawing, setIsDrawing] = useState(false);

  // Stores the starting position for threshold check
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setOriginalImage({
          file,
          url,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        setAppState("editing");
        setError(null);
        setRedactionHistory([[]]);
        setHistoryIndex(0);
        setAiSuggestions([]);
        setAiRan(false);
        setSelectedRedactionId(null);
        setIsDraggingRedaction(false);
        setLiveDraggedRedaction(null);
        setDragOffset(null);
        setIsManualMode(false); // Reset manual mode to false on new image
        clickedRedactionIdRef.current = null; // Clear this ref on new image
        deletionHandledRef.current = false; // Reset deletion flag
        setShowFeedbackButton(false); // Reset feedback button visibility

        setLoadedImage(img);
      };
      img.src = url;
    } else {
      setError("Please select a valid image file.");
      handleReset();
    }
  };

  const handleReset = () => {
    setAppState("initial");
    setOriginalImage(null);
    setError(null);
    setRedactionHistory([[]]);
    setHistoryIndex(0);
    setAiSuggestions([]);
    setAiRan(false);
    setSelectedRedactionId(null);
    setIsDraggingRedaction(false);
    setLiveDraggedRedaction(null);
    setDragOffset(null);
    setIsManualMode(false);
    clickedRedactionIdRef.current = null; // Clear this ref on reset
    deletionHandledRef.current = false; // Reset deletion flag
    setShowFeedbackButton(false); // Reset feedback button visibility

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    // Using image/png for simplicity, can be changed based on need
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "privashot-redacted.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show feedback button after download is initiated
    setShowFeedbackButton(true);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setSelectedRedactionId(null);
      setHistoryIndex((prev) => prev - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < redactionHistory.length - 1) {
      setSelectedRedactionId(null);
      setHistoryIndex((prev) => prev + 1);
    }
  };

  const handleAiRedact = async () => {
    if (!originalImage || !loadedImage || !originalImage.file) return;

    setIsLoadingAi(true);
    setError(null);
    setAiRan(true);
    setAiSuggestions([]);
    setSelectedRedactionId(null);
    setIsAiPanelOpen(false); // Close modal when analysis starts

    const fileToSend = originalImage.file;

    try {
      const imageSize = {
        width: loadedImage.naturalWidth,
        height: loadedImage.naturalHeight,
      };

      const allResults: Omit<AiSuggestion, "id">[][] = [];

      // No API key passed here, handled in service
      const rawSuggestions = await geminiFindSensitiveInfo(
        fileToSend,
        imageSize,
      );

      if (rawSuggestions.length > 0) {
        allResults.push(rawSuggestions);
      }

      const rawFinalSuggestions = mergeSuggestions(allResults);

      const finalSuggestions: AiSuggestion[] = rawFinalSuggestions.map((s) => ({
        ...s,
        id: `ai-${Date.now()}-${s.x}-${s.y}-${s.width}-${s.height}`, // Create unique ID
      }));

      setAiSuggestions(finalSuggestions);

      // Open modal automatically if suggestions are found
      if (finalSuggestions.length > 0) {
        setIsAiPanelOpen(true);
      }
    } catch (e) {
      console.error("AI Redact Error:", e);
      setError("An error occurred during AI analysis. Please try again.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  const applyRedactions = (redactionsToApply: ManualRedaction[]) => {
    if (redactionsToApply.length === 0) return;

    // Filter out redactions that overlap significantly with existing ones
    // This prevents Manual/AI collisions as requested.
    const uniqueRedactionsToApply = redactionsToApply.filter((newR) => {
      return !currentRedactions.some((existingR) =>
        hasSignificantOverlap(newR, existingR),
      );
    });

    if (uniqueRedactionsToApply.length === 0) return;

    const newHistory = redactionHistory.slice(0, historyIndex + 1);
    const newRedactions = [...currentRedactions, ...uniqueRedactionsToApply];
    setRedactionHistory([...newHistory, newRedactions]);
    setHistoryIndex(newHistory.length);
    setSelectedRedactionId(null);
  };

  const updateRedactionInHistory = (updatedRedaction: ManualRedaction) => {
    const newRedactions = currentRedactions.map((r) =>
      r.id === updatedRedaction.id ? updatedRedaction : r,
    );
    const newHistory = redactionHistory.slice(0, historyIndex + 1);
    setRedactionHistory([...newHistory, newRedactions]);
    setHistoryIndex(newHistory.length);
    setSelectedRedactionId(null); // Deselect after moving
  };

  const handleApplySuggestion = (suggestionId: string) => {
    const suggestion = aiSuggestions.find((s) => s.id === suggestionId);
    if (suggestion) {
      applyRedactions([suggestion]);
      setAiSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
      setSelectedRedactionId(null); // Deselect any currently selected redaction
      setIsManualMode(true); // Automatically enable manual mode for editing
    }
  };

  const handleDismissSuggestion = (suggestionId: string) => {
    setAiSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));

    // If the last suggestion is dismissed, close the modal
    if (aiSuggestions.length === 1 && aiSuggestions[0].id === suggestionId) {
      setIsAiPanelOpen(false);
    }
  };

  const handleApplyAllSuggestions = () => {
    applyRedactions(aiSuggestions);
    setAiSuggestions([]);
    setIsAiPanelOpen(false); // Apply all, close modal
    setSelectedRedactionId(null); // Deselect any currently selected redaction
    setIsManualMode(true); // Automatically enable manual mode for editing
  };

  const handleDismissAllSuggestions = () => {
    setAiSuggestions([]);
    setIsAiPanelOpen(false); // Dismiss all, close modal
  };

  const handleDeleteRedaction = (redactionId: string) => {
    const newRedactions = currentRedactions.filter((r) => r.id !== redactionId);
    const newHistory = redactionHistory.slice(0, historyIndex + 1);
    setRedactionHistory([...newHistory, newRedactions]);
    setHistoryIndex(newHistory.length);
    setSelectedRedactionId(null);
    deletionHandledRef.current = true; // Mark that a deletion occurred
  };

  // Effect to load the image into an HTMLImageElement
  useEffect(() => {
    if (!originalImage) {
      setLoadedImage(null);
      return;
    }
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = originalImage.url;
    image.onload = () => {
      setLoadedImage(image);
    };
  }, [originalImage]);

  // Effect to draw on the canvas when the image or redactions change
  useEffect(() => {
    if (appState === "editing" && loadedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to the natural size of the image
      canvas.width = loadedImage.naturalWidth;
      canvas.height = loadedImage.naturalHeight;

      // Draw the original image
      ctx.drawImage(loadedImage, 0, 0);

      // Apply redactions
      ctx.fillStyle = "#000000";
      const REDACTION_CORNER_RADIUS = 8; // 8px for rounded corners

      if (Array.isArray(currentRedactions)) {
        currentRedactions.forEach((redaction) => {
          // Only draw if not the currently dragged redaction, or if not dragging at all
          if (!isDraggingRedaction || redaction.id !== selectedRedactionId) {
            drawRoundedRect(
              ctx,
              redaction.x,
              redaction.y,
              redaction.width,
              redaction.height,
              REDACTION_CORNER_RADIUS,
            );
          }
        });
      }

      // Draw the live-dragged redaction if it exists
      if (isDraggingRedaction && liveDraggedRedaction) {
        drawRoundedRect(
          ctx,
          liveDraggedRedaction.x,
          liveDraggedRedaction.y,
          liveDraggedRedaction.width,
          liveDraggedRedaction.height,
          REDACTION_CORNER_RADIUS,
        );
      }
    }
  }, [
    appState,
    loadedImage,
    currentRedactions,
    isDraggingRedaction,
    selectedRedactionId,
    liveDraggedRedaction,
  ]);

  // Effect for scaling logic to keep the canvas responsive
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container || !loadedImage) return;

    const updateScale = () => {
      if (!imageContainerRef.current || !loadedImage) return;
      const { clientWidth } = imageContainerRef.current;
      // Calculate the height needed to maintain aspect ratio
      const clientHeight =
        clientWidth * (loadedImage.naturalHeight / loadedImage.naturalWidth);

      // Calculate the ratio needed to convert screen coordinates back to image natural coordinates
      setScaleRatio({
        x: loadedImage.naturalWidth / clientWidth,
        y: loadedImage.naturalHeight / clientHeight,
      });
    };

    // Initial call
    updateScale();

    // Use ResizeObserver for responsive scaling
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, [loadedImage]);

  // Manual redaction handlers for both mouse and touch
  const getPointerPosition = (
    e: React.MouseEvent | React.TouchEvent | TouchEvent,
  ): { clientX: number; clientY: number } | null => {
    if (e.type.startsWith("touch")) {
      const touchEvent = e as React.TouchEvent | TouchEvent;
      const touch =
        "touches" in touchEvent
          ? touchEvent.touches[0] || touchEvent.changedTouches[0]
          : (touchEvent as unknown as TouchEvent).changedTouches[0];

      if (touch) {
        return { clientX: touch.clientX, clientY: touch.clientY };
      }
    } else {
      const mouseEvent = e as React.MouseEvent;
      return { clientX: mouseEvent.clientX, clientY: mouseEvent.clientY };
    }
    return null;
  };

  // Converts screen coordinates to image natural coordinates
  const getCanvasCoordinates = (
    e: React.MouseEvent | React.TouchEvent | TouchEvent,
  ): { x: number; y: number } | null => {
    if (!imageContainerRef.current || !loadedImage || !canvasRef.current)
      return null;

    const pointer = getPointerPosition(e);
    if (!pointer) return null;

    const rect = canvasRef.current.getBoundingClientRect();

    // Use the calculated scale ratios
    const scaleX = loadedImage.naturalWidth / rect.width;
    const scaleY = loadedImage.naturalHeight / rect.height;

    return {
      x: (pointer.clientX - rect.left) * scaleX,
      y: (pointer.clientY - rect.top) * scaleY,
    };
  };

  const handleDrawStart = (
    e: React.MouseEvent | React.TouchEvent | TouchEvent,
  ) => {
    if (isLoadingAi || isAiPanelOpen || !isManualMode) return;

    const pos = getCanvasCoordinates(e);
    if (!pos) return;

    // Reset dragging states always at start, will be set true in move if dragging occurs
    setIsDraggingRedaction(false);
    setLiveDraggedRedaction(null);
    setDragOffset(null);
    deletionHandledRef.current = false; // Reset deletion flag for a new interaction

    // 1. Check if an existing redaction was clicked
    // Search in reverse to hit top-most redaction if overlapping
    // Add HIT_SLOP to detection to make it easier to select small boxes on mobile
    const hitSlopX = HIT_SLOP_SCREEN_PX * scaleRatio.x;
    const hitSlopY = HIT_SLOP_SCREEN_PX * scaleRatio.y;

    const clickedRedaction = [...currentRedactions]
      .reverse()
      .find(
        (r) =>
          pos.x >= r.x - hitSlopX &&
          pos.x <= r.x + r.width + hitSlopX &&
          pos.y >= r.y - hitSlopY &&
          pos.y <= r.y + r.height + hitSlopY,
      );

    if (clickedRedaction) {
      setSelectedRedactionId(clickedRedaction.id);
      clickedRedactionIdRef.current = clickedRedaction.id; // Store ID of clicked redaction
      startPosRef.current = pos; // Store initial position for drag check
      // No immediate preventDefault for touch here. Let handleDrawMove decide based on SCROLL_THRESHOLD.
      return;
    }

    // 2. If no redaction was clicked, prepare for a new potential drawing.
    setSelectedRedactionId(null); // Deselect any previously selected redaction
    clickedRedactionIdRef.current = null; // No redaction was clicked
    startPosRef.current = pos;
    setCurrentDrawingBox(null);
    setIsDrawing(false);
  };

  const handleDrawMove = (
    e: React.MouseEvent | React.TouchEvent | TouchEvent,
  ) => {
    if (isLoadingAi || isAiPanelOpen || !isManualMode) return;

    const currentPos = getCanvasCoordinates(e);
    if (!currentPos || !startPosRef.current) return;

    // Check if we are interacting with an existing redaction (potential drag)
    if (clickedRedactionIdRef.current) {
      // If not yet dragging, check if motion exceeds threshold to initiate drag
      if (!isDraggingRedaction) {
        const distance = calculateDistance(startPosRef.current, currentPos);
        if (distance > SCROLL_THRESHOLD) {
          // Initiate drag
          setIsDraggingRedaction(true);
          const initialRedaction = currentRedactions.find(
            (r) => r.id === clickedRedactionIdRef.current,
          );
          if (initialRedaction) {
            setLiveDraggedRedaction(initialRedaction);
            setDragOffset({
              x: currentPos.x - initialRedaction.x,
              y: currentPos.y - initialRedaction.y,
            });
          }
          // If we just initiated dragging, prevent default for touch
          if (e.type.startsWith("touch")) {
            (e as TouchEvent).preventDefault();
          }
        } else {
          // Not a drag yet, still a potential click, don't move redaction
          // If distance is below SCROLL_THRESHOLD, `preventDefault` is not called for touch,
          // allowing native scrolling in the early phase of touch.
          return; // Not dragging, so nothing to move
        }
      }

      // If dragging is active, update the liveDraggedRedaction position
      if (
        isDraggingRedaction &&
        liveDraggedRedaction &&
        loadedImage &&
        dragOffset
      ) {
        const newX = currentPos.x - dragOffset.x;
        const newY = currentPos.y - dragOffset.y;

        const clampedX = Math.max(
          0,
          Math.min(newX, loadedImage.naturalWidth - liveDraggedRedaction.width),
        );
        const clampedY = Math.max(
          0,
          Math.min(
            newY,
            loadedImage.naturalHeight - liveDraggedRedaction.height,
          ),
        );

        setLiveDraggedRedaction((prev) =>
          prev ? { ...prev, x: clampedX, y: clampedY } : null,
        );

        // Prevent scrolling for touch events during active drag
        if (e.type.startsWith("touch")) {
          (e as TouchEvent).preventDefault();
        }
        return; // Exit if dragging a redaction
      }
    } else {
      // Handle drawing a new redaction (original logic with touch threshold)
      let shouldPreventDefault = false;

      setCurrentDrawingBox({
        startX: startPosRef.current.x,
        startY: startPosRef.current.y,
        endX: currentPos.x,
        endY: currentPos.y,
      });

      if (e.type.startsWith("touch")) {
        if (!isDrawing) {
          const distance = calculateDistance(startPosRef.current, currentPos);
          if (distance > SCROLL_THRESHOLD) {
            setIsDrawing(true);
            shouldPreventDefault = true;
          } else {
            shouldPreventDefault = false; // Allow scroll if not past threshold
          }
        } else {
          shouldPreventDefault = true; // Drawing already started, prevent scroll
        }

        if (shouldPreventDefault) {
          (e as TouchEvent).preventDefault();
        }
      }
    }
  };

  const handleDrawEnd = (
    e: React.MouseEvent | React.TouchEvent | TouchEvent,
  ) => {
    // If a deletion was just handled by the X button, skip all other logic
    if (deletionHandledRef.current) {
      deletionHandledRef.current = false; // Reset for next interaction
      startPosRef.current = null;
      clickedRedactionIdRef.current = null;
      setIsDrawing(false); // Ensure drawing state is reset
      setCurrentDrawingBox(null); // Ensure drawing box is reset
      return;
    }

    // Reset startPosRef and clickedRedactionIdRef at the end of any interaction
    const initialStartPos = startPosRef.current;
    const initialClickedRedactionId = clickedRedactionIdRef.current;

    startPosRef.current = null;
    clickedRedactionIdRef.current = null;

    // 1. Handle ending an existing redaction drag
    if (isDraggingRedaction && selectedRedactionId && liveDraggedRedaction) {
      updateRedactionInHistory(liveDraggedRedaction); // Commit the final dragged position
      setIsDraggingRedaction(false);
      setLiveDraggedRedaction(null);
      setDragOffset(null);
      return; // Exit as drag operation concluded
    }

    // 2. Handle a potential "click" on an existing redaction (no significant drag occurred)
    // This case happens if initialClickedRedactionId was set but isDraggingRedaction never became true.
    if (initialClickedRedactionId) {
      // The selectedRedactionId was already set in handleDrawStart for this redaction.
      // It remains selected, and the X button will be visible and clickable.
      setSelectedRedactionId(initialClickedRedactionId); // Ensure it stays selected after a click.
      return;
    }

    // 3. Handle ending a new redaction drawing (original logic)
    // If no drawing box was ever established (e.g., just a click without drawing movement)
    if (!currentDrawingBox || !initialStartPos) {
      setIsDrawing(false);
      setCurrentDrawingBox(null);
      return;
    }

    const { startX, startY, endX, endY } = currentDrawingBox;
    const newRedaction: ManualRedaction = {
      id: `manual-${Date.now()}`,
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
    };

    if (newRedaction.width > 5 && newRedaction.height > 5) {
      applyRedactions([newRedaction]);
    }

    // Reset drawing state
    setIsDrawing(false);
    setCurrentDrawingBox(null);
  };

  const renderContent = () => {
    if (appState === "initial") {
      return (
        <UploadPlaceholder onClick={() => fileInputRef.current?.click()} />
      );
    }

    if (appState === "editing" && originalImage) {
      return (
        <div className="w-full flex flex-col items-center gap-6">
          <EditingInterface
            className="w-full"
            isLoadingAi={isLoadingAi}
            currentDrawingBox={currentDrawingBox}
            canvasRef={canvasRef}
            imageContainerRef={imageContainerRef}
            onDrawStart={handleDrawStart}
            onDrawMove={handleDrawMove}
            onDrawEnd={handleDrawEnd}
            scaleRatio={scaleRatio}
            currentRedactions={currentRedactions}
            selectedRedactionId={selectedRedactionId}
            onDeleteRedaction={handleDeleteRedaction}
            isDraggingRedaction={isDraggingRedaction}
            liveDraggedRedaction={liveDraggedRedaction}
            isManualMode={isManualMode}
          />
        </div>
      );
    }

    return null;
  };

  const renderActions = () => {
    if (appState === "editing") {
      const canUndo = historyIndex > 0;
      const canRedo = historyIndex < redactionHistory.length - 1;
      // Disable AI button if AI is loading, AI panel is open, or a redaction is currently being dragged
      const aiButtonDisabled =
        isLoadingAi || isAiPanelOpen || isDraggingRedaction;

      return (
        <div className="w-full flex flex-col gap-2">
          {/* Manual Mode Toggle Switch */}
          <div
            className="w-full flex items-center justify-between bg-[#323336] p-3 rounded-xl border border-[#444548]"
            onClick={() => setIsManualMode(!isManualMode)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg transition-colors ${isManualMode ? "bg-indigo-500/20 text-indigo-300" : "bg-gray-700/50 text-gray-400"}`}
              >
                <PencilIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-sm ${isManualMode ? "text-white" : "text-gray-400"}`}
                >
                  Manual Redaction
                </span>
                <span className="text-xs text-gray-500">
                  Draw or edit boxes manually
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsManualMode(!isManualMode);
              }}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${isManualMode ? "bg-indigo-500" : "bg-gray-600"}`}
              aria-label="Toggle Manual Redaction"
            >
              <span
                className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isManualMode ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          <button
            onClick={handleAiRedact}
            disabled={aiButtonDisabled}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 disabled:bg-purple-900/50 disabled:text-purple-300 disabled:cursor-wait"
          >
            {isLoadingAi ? (
              <>
                <LoaderIcon className="w-5 h-5 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                AI Redact & Find
                <span className="bg-blue-400/20 text-blue-200 px-2 py-0.5 rounded-full text-xs ml-2">
                  Beta
                </span>
              </>
            )}
          </button>

          {/* Show AI Results Button (Only if results exist) */}
          {aiRan && aiSuggestions.length > 0 && !isLoadingAi && (
            <button
              onClick={() => setIsAiPanelOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-xl transition-colors duration-200"
            >
              {aiSuggestions.length} AI Suggestion
              {aiSuggestions.length > 1 ? "s" : ""} Found (Review)
            </button>
          )}

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 bg-[#444548] hover:bg-[#5a5b5e] text-[#F3F1EB] font-bold py-3 px-4 rounded-xl transition-colors duration-200"
            >
              <TrashIcon className="w-5 h-5" />
              Reset
            </button>
            <button
              onClick={handleUndo}
              disabled={!canUndo || aiButtonDisabled}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 disabled:bg-[#3a3b3e] disabled:text-[#888] disabled:cursor-not-allowed"
            >
              <UndoIcon className="w-5 h-5" />
              Undo
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo || aiButtonDisabled}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 disabled:bg-[#3a3b3e] disabled:text-[#888] disabled:cursor-not-allowed"
            >
              <RedoIcon className="w-5 h-5" />
              Redo
            </button>
            <button
              onClick={handleDownload}
              disabled={aiButtonDisabled}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 disabled:bg-[#3a3b3e] disabled:text-[#888] disabled:cursor-not-allowed"
            >
              <DownloadIcon className="w-5 h-5" />
              Download
            </button>
          </div>

          {/* Share Feedback Button - only shown after download */}
          {showFeedbackButton && (
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdKo0kFpprHcZnJ-di0BZUNQ5RYx4fXCVzpRxGb3llaXa_49Q/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg mt-1 text-sm"
            >
              <ChatBubbleIcon className="w-4 h-4" />
              Share Feedback
            </a>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#232427] text-[#F3F1EB] h-[100dvh] flex flex-col font-sans overflow-hidden">
      <header className="p-4 border-b border-[#444548] flex-shrink-0 z-10 bg-[#232427] flex items-center justify-center relative">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Privashot</h1>
          <p className="text-sm text-[#a8a29e] mt-1 hidden sm:block">
            Automatically redact sensitive information with AI or draw manually.
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center p-4 overflow-y-auto w-full relative">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center min-h-0">
          {error && (
            <div
              className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative w-full mb-4"
              role="alert"
            >
              {error}
            </div>
          )}
          {renderContent()}
        </div>
      </main>

      {appState === "editing" && (
        <footer className="bg-[#232427] border-t border-[#444548] z-20 flex-shrink-0 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="max-w-4xl mx-auto p-3">{renderActions()}</div>
        </footer>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* AI Suggestions Modal Component */}
      <AiSuggestionsModal
        isOpen={isAiPanelOpen}
        onClose={() => setIsAiPanelOpen(false)}
        isLoading={isLoadingAi}
        suggestions={aiSuggestions}
        onApply={handleApplySuggestion}
        onDismiss={handleDismissSuggestion}
        onApplyAll={handleApplyAllSuggestions}
        onDismissAll={handleDismissAllSuggestions}
      />
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. HELPER COMPONENTS
// ----------------------------------------------------------------------

const UploadPlaceholder = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="w-full h-96 max-w-4xl flex flex-col items-center justify-center border-2 border-dashed border-[#444548] rounded-2xl cursor-pointer hover:border-indigo-500 hover:bg-white/5 transition-colors duration-200"
  >
    <UploadIcon className="w-16 h-16 text-[#a8a29e]/50 mb-4" />
    <span className="text-xl font-semibold text-[#F3F1EB]">
      Click to select a screenshot
    </span>
    <p className="text-[#a8a29e]/80 mt-1">Upload an image to get started</p>
  </div>
);

interface EditingInterfaceProps {
  className: string;
  isLoadingAi: boolean;
  currentDrawingBox: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imageContainerRef: React.RefObject<HTMLDivElement | null>;
  onDrawStart: (e: React.MouseEvent | React.TouchEvent | TouchEvent) => void;
  onDrawMove: (e: React.MouseEvent | React.TouchEvent | TouchEvent) => void;
  onDrawEnd: (e: React.MouseEvent | React.TouchEvent | TouchEvent) => void;
  scaleRatio: { x: number; y: number };
  currentRedactions: ManualRedaction[];
  selectedRedactionId: string | null;
  onDeleteRedaction: (id: string) => void;
  isDraggingRedaction: boolean;
  liveDraggedRedaction: ManualRedaction | null;
  isManualMode: boolean;
}

const EditingInterface = (props: EditingInterfaceProps) => {
  const {
    className,
    isLoadingAi,
    currentDrawingBox,
    canvasRef,
    imageContainerRef,
    onDrawStart,
    onDrawMove,
    onDrawEnd,
    scaleRatio,
    currentRedactions,
    selectedRedactionId,
    onDeleteRedaction,
    isDraggingRedaction,
    liveDraggedRedaction,
    isManualMode,
  } = props;

  // CRITICAL: Attach touch event listeners directly to the DOM with passive: false
  // This is required to be able to prevent default browser scrolling if we decide to start drawing.
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    // Type coercion for direct DOM element event listeners
    const touchStart = onDrawStart as (e: TouchEvent) => void;
    const touchMove = onDrawMove as (e: TouchEvent) => void;
    const touchEnd = onDrawEnd as (e: TouchEvent) => void;

    // Use passive: false to take control of touchmove events
    container.addEventListener("touchstart", touchStart, { passive: false });
    container.addEventListener("touchmove", touchMove, { passive: false });
    container.addEventListener("touchend", touchEnd, { passive: false });
    container.addEventListener("touchcancel", touchEnd, { passive: false });

    return () => {
      container.removeEventListener("touchstart", touchStart);
      container.removeEventListener("touchmove", touchMove);
      container.removeEventListener("touchend", touchEnd);
      container.removeEventListener("touchcancel", touchEnd);
    };
  }, [imageContainerRef, onDrawStart, onDrawMove, onDrawEnd]);

  const DrawingBox = () => {
    if (!currentDrawingBox) return null;

    const canvas = canvasRef.current;
    if (!canvas) return null;

    // Recalculate conversion factors based on current canvas/image size
    const scaleX = canvas.clientWidth / canvas.width;
    const scaleY = canvas.clientHeight / canvas.height;

    const drawingRect = {
      left: Math.min(currentDrawingBox.startX, currentDrawingBox.endX) * scaleX,
      top: Math.min(currentDrawingBox.startY, currentDrawingBox.endY) * scaleY,
      width:
        Math.abs(currentDrawingBox.endX - currentDrawingBox.startX) * scaleX,
      height:
        Math.abs(currentDrawingBox.endY - currentDrawingBox.startY) * scaleY,
    };

    return (
      <div
        className="absolute bg-indigo-500/40 border-2 border-dashed border-indigo-300 rounded-lg pointer-events-none"
        style={drawingRect}
      />
    );
  };

  const cursorClass = () => {
    if (isLoadingAi) return "cursor-wait";
    if (!isManualMode) return "cursor-default"; // Default cursor when manual mode is off
    if (isDraggingRedaction) return "cursor-grabbing";
    if (selectedRedactionId && !isDraggingRedaction) return "cursor-grab"; // Show grab cursor when selected but not dragging
    return "cursor-crosshair";
  };

  return (
    <div className="flex justify-center w-full">
      <div
        ref={imageContainerRef}
        className={`w-full max-w-5xl relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 ${cursorClass()}`} // Removed touch-none
        // Mouse event listeners for desktop (passive: false is not applicable here as it's for touch events)
        onMouseDown={onDrawStart}
        onMouseMove={onDrawMove}
        onMouseUp={onDrawEnd}
        onMouseLeave={onDrawEnd}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-auto object-contain bg-black/20 border border-[#444548] rounded-2xl"
        />

        {/* Visual overlays for redactions, including selection and delete button */}
        {currentRedactions.map((redaction) => {
          // Determine the effective position for rendering
          const effectiveRedaction =
            isDraggingRedaction &&
            redaction.id === selectedRedactionId &&
            liveDraggedRedaction
              ? liveDraggedRedaction
              : redaction;

          // Only show selection border if manual mode is enabled
          const isSelected =
            redaction.id === selectedRedactionId && isManualMode;

          return (
            <div
              key={redaction.id}
              className={`absolute rounded-lg ${isSelected ? "border-2 border-indigo-400" : ""}`}
              style={{
                left: `${effectiveRedaction.x / scaleRatio.x}px`,
                top: `${effectiveRedaction.y / scaleRatio.y}px`,
                width: `${effectiveRedaction.width / scaleRatio.x}px`,
                height: `${effectiveRedaction.height / scaleRatio.y}px`,
                // Cursor changes on hover if selected, but not if scroll is locked
                cursor: isSelected
                  ? isDraggingRedaction
                    ? "grabbing"
                    : "grab"
                  : "default",
              }}
              // These overlays are just visual feedback, they don't handle clicks themselves for drag start.
              // The main onDrawStart/Move/End handlers on the container manage that.
            >
              {/* The delete button should ONLY appear if this specific redaction is selected AND not being dragged AND manual mode is ON */}
              {isSelected && !isDraggingRedaction && (
                <button
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    e.preventDefault(); // Prevent default browser touch behavior
                    onDeleteRedaction(redaction.id);
                  }}
                  onClick={(e) => {
                    // Added onClick for mouse interaction
                    e.stopPropagation();
                    onDeleteRedaction(redaction.id);
                  }}
                  className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-500 transition-colors shadow-lg rounded-full p-1 pointer-events-auto z-10"
                  aria-label="Delete Redaction"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </div>
          );
        })}

        <DrawingBox />
      </div>
    </div>
  );
};

// Type Badge Component
const TypeBadge = ({ type }: { type: string }) => {
  const typeStyles: { [key: string]: string } = {
    "Personally Identifiable Information":
      "bg-sky-500/20 text-sky-300 border border-sky-500/30",
    "Financial Information":
      "bg-green-500/20 text-green-300 border border-green-500/30",
    "Government & Legal Identifiers":
      "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    "Communication & Personal Content":
      "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  };

  const style =
    typeStyles[type] ||
    "bg-gray-500/20 text-gray-300 border border-gray-500/30";

  return (
    <span
      className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${style}`}
    >
      {type}
    </span>
  );
};

interface AiSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  suggestions: AiSuggestion[];
  onApply: (id: string) => void;
  onDismiss: (id: string) => void;
  onApplyAll: () => void;
  onDismissAll: () => void;
}

// AI Suggestions Modal Component
const AiSuggestionsModal = (props: AiSuggestionsModalProps) => {
  const {
    isOpen,
    onClose,
    isLoading,
    suggestions,
    onApply,
    onDismiss,
    onApplyAll,
    onDismissAll,
  } = props;

  if (!isOpen) return null;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <LoaderIcon className="w-12 h-12 text-purple-400 animate-spin" />
          <p className="mt-4 font-semibold text-lg">Analyzing...</p>
        </div>
      );
    }

    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <SparklesIcon className="w-12 h-12 text-gray-500" />
          <p className="mt-4 font-semibold text-lg">
            No sensitive information found
          </p>
          <p className="text-sm text-gray-400">
            AI analysis complete. You can close this window.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-center sm:items-baseline gap-2">
          <h3 className="font-bold text-xl text-white">
            AI Suggestions ({suggestions.length})
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onApplyAll}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
            >
              <CheckIcon className="w-4 h-4" />
              Redact All
            </button>
            <button
              onClick={onDismissAll}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
            >
              <XMarkIcon className="w-4 h-4" />
              Dismiss All
            </button>
          </div>
        </div>
        <ul className="divide-y divide-gray-700/50 overflow-y-auto flex-grow p-2">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="p-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 hover:bg-white/5 rounded-md"
            >
              <div className="flex-grow flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <TypeBadge type={s.type} />
                  <span
                    className="font-mono text-sm text-gray-300 truncate"
                    title={s.text}
                  >
                    {s.text}
                  </span>
                </div>
                <div className="text-xs text-gray-400 pl-1">
                  <span className="mr-2">
                    X:{Math.round(s.x)} Y:{Math.round(s.y)}
                  </span>
                  <span>
                    W:{Math.round(s.width)} H:{Math.round(s.height)}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex gap-1 self-end md:self-auto">
                <button
                  onClick={() => onApply(s.id)}
                  className="p-1.5 bg-emerald-600/20 hover:bg-emerald-500/40 text-emerald-300 rounded-md transition-colors"
                  aria-label="Apply Redaction"
                >
                  <CheckIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDismiss(s.id)}
                  className="p-1.5 bg-red-600/20 hover:bg-red-500/40 text-red-300 rounded-md transition-colors"
                  aria-label="Dismiss Suggestion"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose} // Close when clicking outside
    >
      <div
        className="bg-[#2d2e32] border border-[#444548] rounded-2xl shadow-2xl shadow-black/50 flex flex-col w-full max-w-4xl h-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-suggestions-title"
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 id="ai-suggestions-title" className="text-2xl font-bold">
            AI Analysis Results
          </h2>
          <button
            onClick={onClose}
            className="p-3 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};
