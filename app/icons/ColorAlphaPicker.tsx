"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import { parseHexAlpha } from "@/lib/icons";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

const BRAND_SWATCHES = [
  "#e17100",
  "#ffb900",
  "#bb4d00",
  "#155dfc",
  "#51a2ff",
  "#18181b",
  "#ffffff",
] as const;

interface ColorAlphaPickerProps {
  label: string;
  color: string;
  onChange: (nextColor: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function ColorAlphaPicker({
  label,
  color,
  onChange,
  isOpen,
  onToggle,
  onClose,
}: ColorAlphaPickerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const parsed = useMemo(() => parseHexAlpha(color), [color]);
  const opacityPercent = Math.round(parsed.opacity * 100);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={wrapperRef} className={styles.colorPickerWrapper}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`${label} color and opacity (${opacityPercent}%)`}
        className={cn(
          styles.colorTrigger,
          "font-nunito",
          isOpen && styles.colorTriggerActive,
        )}
      >
        <span className={styles.swatchCircle} aria-hidden="true">
          <span
            className={styles.swatchFill}
            style={{ backgroundColor: color }}
          />
        </span>
        <span>{label}</span>
        <span className={styles.opacityBadge}>{opacityPercent}%</span>
      </button>

      {isOpen ? (
        <div
          className={styles.colorPopover}
          role="dialog"
          aria-label={`${label} color picker`}
        >
          <div className={styles.pickerContainer}>
            <HexAlphaColorPicker color={color} onChange={onChange} />
          </div>

          <div className={styles.hexInputRow}>
            <HexColorInput
              color={color}
              onChange={onChange}
              alpha
              prefixed
              className={cn(styles.hexInput, "font-mono")}
              aria-label={`${label} hex color`}
            />
            <span className={cn(styles.alphaReadout, "font-nunito")}>
              {opacityPercent}%
            </span>
          </div>

          <div className={styles.swatchRow} aria-label="Brand color presets">
            {BRAND_SWATCHES.map((swatchHex) => {
              const isSelected = parsed.hex === swatchHex;
              return (
                <button
                  key={swatchHex}
                  type="button"
                  onClick={() => onChange(`${swatchHex}${parsed.alphaHex}`)}
                  className={cn(
                    styles.presetSwatch,
                    isSelected && styles.presetSwatchActive,
                  )}
                  style={{ backgroundColor: swatchHex }}
                  title={`Use ${swatchHex}`}
                  aria-label={`Set ${label} color to ${swatchHex}`}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
