"use client";

import React, {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Check, Copy, Download, Search, X } from "lucide-react";
import { AudiowaveText } from "@/components/AudiowaveText";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import {
  createSvgString,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
  expandIconCatalog,
  ICON_CHUNK_SIZE,
  ICON_FAMILIES,
  ICON_WEIGHTS,
  parseHexAlpha,
  type IconCatalogPayload,
  type IconFamily,
  type IconManifest,
  type IconPaths,
  type IconSet,
  type IconWeight,
} from "@/lib/icons";
import { ColorAlphaPicker } from "./ColorAlphaPicker";
import styles from "./styles.module.css";

interface IconsExplorerProps {
  initialManifest: IconManifest;
}

const fullCatalogCache = new Map<IconFamily, IconSet[]>();
const initialCatalogCache = new Map<IconFamily, IconSet[]>();

async function fetchCatalog(
  url: string,
  signal: AbortSignal,
): Promise<IconCatalogPayload> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch icon data (${response.status})`);
  }
  return (await response.json()) as IconCatalogPayload;
}

interface IconSvgPreviewProps {
  paths: IconPaths;
  size: number;
}

function IconSvgPreview({ paths, size }: IconSvgPreviewProps) {
  const primaryPath = paths[0] ?? "";
  const secondaryPath = paths[1] ?? "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      {secondaryPath ? (
        <path
          fill="var(--icon-secondary)"
          fillOpacity="var(--icon-secondary-opacity)"
          d={secondaryPath}
        />
      ) : null}
      {primaryPath ? (
        <path
          fill="var(--icon-primary)"
          fillOpacity="var(--icon-primary-opacity)"
          d={primaryPath}
        />
      ) : null}
    </svg>
  );
}

interface IconCardItemProps {
  item: IconSet;
  onSelect: (iconSet: IconSet, weight: IconWeight) => void;
}

const IconCardItem = memo(function IconCardItem({
  item,
  onSelect,
}: IconCardItemProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const weightEl = target?.closest<HTMLElement>("[data-weight]");
    const weight = (weightEl?.dataset.weight as IconWeight | undefined) ?? "solid";
    onSelect(item, weight);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(item, "solid");
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.iconCard}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Inspect ${item.iconName} icon`}
    >
      <div className={styles.cardPreviewSquare}>
        <div
          className={styles.boxRegular}
          title="Regular (1x)"
          data-weight="regular"
        >
          <IconSvgPreview paths={item.regular} size={item.size} />
        </div>
        <div className={styles.boxSolid} title="Solid (2x)" data-weight="solid">
          <IconSvgPreview paths={item.solid} size={item.size} />
        </div>
        <div className={styles.boxLight} title="Light (1x)" data-weight="light">
          <IconSvgPreview paths={item.light} size={item.size} />
        </div>
        <div className={styles.boxThin} title="Thin (1x)" data-weight="thin">
          <IconSvgPreview paths={item.thin} size={item.size} />
        </div>
        <div className={styles.cardNameBox}>
          <span className={styles.iconName} title={item.iconName}>
            {item.iconName}
          </span>
        </div>
      </div>
    </div>
  );
});

export function IconsExplorer({ initialManifest }: IconsExplorerProps) {
  const [activeFamily, setActiveFamily] = useState<IconFamily>("duo");
  const [icons, setIcons] = useState<IconSet[]>(
    () => fullCatalogCache.get("duo") ?? initialCatalogCache.get("duo") ?? [],
  );
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(
    () => !fullCatalogCache.has("duo") && !initialCatalogCache.has("duo"),
  );
  const [isFullLoaded, setIsFullLoaded] = useState<boolean>(() =>
    fullCatalogCache.has("duo"),
  );
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState<number>(0);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(searchQuery);

  const [primaryColor, setPrimaryColor] = useState<string>(DEFAULT_PRIMARY_COLOR);
  const [secondaryColor, setSecondaryColor] = useState<string>(
    DEFAULT_SECONDARY_COLOR,
  );
  const [openPicker, setOpenPicker] = useState<"primary" | "secondary" | null>(
    null,
  );
  const [isDarkCards, setIsDarkCards] = useState<boolean>(false);

  const [renderedCount, setRenderedCount] = useState<number>(ICON_CHUNK_SIZE);
  const [activeIconSet, setActiveIconSet] = useState<IconSet | null>(null);
  const [modalWeight, setModalWeight] = useState<IconWeight>("solid");
  const [copied, setCopied] = useState<boolean>(false);

  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncCardsTheme = () => {
      const root = document.documentElement;
      const isDark =
        root.classList.contains("dark") ||
        (!root.classList.contains("light") && media.matches);
      setIsDarkCards(isDark);
    };

    syncCardsTheme();
    media.addEventListener("change", syncCardsTheme);

    const observer = new MutationObserver(syncCardsTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      media.removeEventListener("change", syncCardsTheme);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const cachedFull = fullCatalogCache.get(activeFamily);
    if (cachedFull) {
      setIcons(cachedFull);
      setIsInitialLoading(false);
      setIsFullLoaded(true);
      setFetchError(null);
      return;
    }

    const controller = new AbortController();
    let fullFinished = false;
    const cachedInitial = initialCatalogCache.get(activeFamily);

    setFetchError(null);
    setIsFullLoaded(false);
    if (cachedInitial) {
      setIcons(cachedInitial);
      setIsInitialLoading(false);
    } else {
      setIcons([]);
      setIsInitialLoading(true);
    }

    if (!cachedInitial) {
      fetchCatalog(`/icons-data/${activeFamily}-initial.json`, controller.signal)
        .then((payload) => {
          if (controller.signal.aborted || fullFinished) return;
          const expanded = expandIconCatalog(payload);
          initialCatalogCache.set(activeFamily, expanded);
          setIcons(expanded);
          setIsInitialLoading(false);
        })
        .catch(() => {
          // Full catalog fetch handles reporting errors if both fail.
        });
    }

    fetchCatalog(`/icons-data/${activeFamily}.json`, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) return;
        fullFinished = true;
        const expanded = expandIconCatalog(payload);
        fullCatalogCache.set(activeFamily, expanded);
        setIcons(expanded);
        setIsInitialLoading(false);
        setIsFullLoaded(true);
        setFetchError(null);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setIsInitialLoading(false);
        if (!initialCatalogCache.has(activeFamily)) {
          setFetchError(
            error instanceof Error
              ? error.message
              : "Could not load icon catalog.",
          );
        }
      });

    return () => {
      controller.abort();
    };
  }, [activeFamily, retryToken]);

  useEffect(() => {
    setRenderedCount(ICON_CHUNK_SIZE);
  }, [activeFamily, deferredQuery]);

  const filteredIcons = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase();
    if (!query) return icons;
    return icons.filter((item) => item.iconName.toLowerCase().includes(query));
  }, [icons, deferredQuery]);

  const visibleIcons = useMemo(
    () => filteredIcons.slice(0, renderedCount),
    [filteredIcons, renderedCount],
  );

  const hasMore = renderedCount < filteredIcons.length;

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = loadMoreSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRenderedCount((prev) =>
            Math.min(prev + ICON_CHUNK_SIZE, filteredIcons.length),
          );
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, filteredIcons.length]);

  useEffect(() => {
    if (!activeIconSet) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIconSet(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIconSet]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleSelectIcon = useCallback(
    (iconSet: IconSet, weight: IconWeight) => {
      setActiveIconSet(iconSet);
      setModalWeight(weight);
      setCopied(false);
    },
    [],
  );

  const activeModalPaths: IconPaths | null = useMemo(() => {
    if (!activeIconSet) return null;
    return activeIconSet[modalWeight] ?? activeIconSet.solid;
  }, [activeIconSet, modalWeight]);

  const parsedPrimary = useMemo(
    () => parseHexAlpha(primaryColor, "#e17100"),
    [primaryColor],
  );
  const parsedSecondary = useMemo(
    () => parseHexAlpha(secondaryColor, "#ffb900"),
    [secondaryColor],
  );

  const modalSvgCode = useMemo(() => {
    if (!activeIconSet || !activeModalPaths) return "";
    return createSvgString(
      activeModalPaths,
      activeIconSet.size,
      primaryColor,
      secondaryColor,
    );
  }, [activeIconSet, activeModalPaths, primaryColor, secondaryColor]);

  const handleCopySvg = async () => {
    if (!modalSvgCode) return;
    try {
      await navigator.clipboard.writeText(modalSvgCode);
      setCopied(true);
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may be blocked in restricted contexts.
    }
  };

  const handleDownloadSvg = () => {
    if (!activeIconSet || !modalSvgCode) return;
    const blob = new Blob([modalSvgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeIconSet.family}-${activeIconSet.iconName}-${modalWeight}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const familyTotal =
    initialManifest.families[activeFamily]?.count || icons.length;
  const activeFamilyLabel =
    ICON_FAMILIES.find((f) => f.id === activeFamily)?.label ?? "Duo";

  const gridStyleVars = {
    "--icon-primary": parsedPrimary.hex,
    "--icon-primary-opacity": String(parsedPrimary.opacity),
    "--icon-secondary": parsedSecondary.hex,
    "--icon-secondary-opacity": String(parsedSecondary.opacity),
  } as React.CSSProperties;

  return (
    <div className={cn(styles.explorer, "font-nunito")}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className="text-[42px] md:text-[64px] leading-tight font-audiowide">
          <AudiowaveText>Icons</AudiowaveText>
        </h1>
        <p className={cn(styles.heroDesc, "font-nunito")}>
          A calm-tech collection of unique dual-tone SVG vector icons across
          Duo and S Duo styles, tailored for precision UI design and seamless
          React / React Native integration.
        </p>

        <div className={styles.styleFilterContainer}>
          <div className={styles.familySwitcher} role="tablist" aria-label="Icon family">
            {ICON_FAMILIES.map((family) => {
              const isActive = activeFamily === family.id;
              const count = initialManifest.families[family.id]?.count;
              return (
                <button
                  key={family.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFamily(family.id)}
                  className={cn(
                    styles.familyBtn,
                    "font-nunito",
                    isActive && styles.familyBtnActive,
                  )}
                >
                  <span>{family.label}</span>
                  {/*{count ? (
                    <span className={styles.familyCount}>
                      {count.toLocaleString()}
                    </span>
                  ) : null}*/}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Controls Panel */}
      <section className={styles.controlsWrapper} aria-label="Icon filters and customization">
        <div className={styles.controlsCard}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search icons by name (e.g. house, user, wifi, cloud)..."
              aria-label="Search icons by name"
              className={cn(styles.searchInput, "font-nunito")}
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={styles.clearBtn}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>

          <div className={styles.styleControls}>
            <ColorAlphaPicker
              label="Primary"
              color={primaryColor}
              onChange={setPrimaryColor}
              isOpen={openPicker === "primary"}
              onToggle={() =>
                setOpenPicker((prev) => (prev === "primary" ? null : "primary"))
              }
              onClose={() =>
                setOpenPicker((prev) => (prev === "primary" ? null : prev))
              }
            />

            <ColorAlphaPicker
              label="Secondary"
              color={secondaryColor}
              onChange={setSecondaryColor}
              isOpen={openPicker === "secondary"}
              onToggle={() =>
                setOpenPicker((prev) =>
                  prev === "secondary" ? null : "secondary",
                )
              }
              onClose={() =>
                setOpenPicker((prev) => (prev === "secondary" ? null : prev))
              }
            />

            <ThemeSwitcher className={styles.controlsThemeSwitcher} />
          </div>
        </div>
      </section>

      {/* Stats & Grid */}
      <section aria-label="Icon catalog">
        <div className={cn(styles.statsBar, "font-nunito")}>
          <span>
            {isInitialLoading
              ? `Loading ${activeFamilyLabel} icons...`
              : `Showing ${visibleIcons.length.toLocaleString()} of ${filteredIcons.length.toLocaleString()} ${activeFamilyLabel} icons (${familyTotal.toLocaleString()} total in family)`}
          </span>
          {!isFullLoaded && !fetchError ? (
            <span className={styles.loadingBadge}>Loading full catalog...</span>
          ) : null}
        </div>

        {fetchError ? (
          <div className={cn(styles.stateBox, "font-nunito")}>
            <p className="mb-4">{fetchError}</p>
            <button
              type="button"
              onClick={() => setRetryToken((t) => t + 1)}
              className={styles.btnPrimary}
            >
              Retry Loading Icons
            </button>
          </div>
        ) : isInitialLoading ? (
          <div className={cn(styles.stateBox, "font-nunito")}>
            Loading {activeFamilyLabel} icons...
          </div>
        ) : visibleIcons.length === 0 ? (
          <div className={cn(styles.stateBox, "font-nunito")}>
            No icons found matching &ldquo;{searchQuery.trim()}&rdquo;.
          </div>
        ) : (
          <>
            <div
              className={cn(
                styles.iconGrid,
                isDarkCards ? styles.darkCards : styles.lightCards,
              )}
              style={gridStyleVars}
            >
              {visibleIcons.map((item) => (
                <IconCardItem
                  key={`${item.family}-${item.iconName}`}
                  item={item}
                  onSelect={handleSelectIcon}
                />
              ))}
            </div>

            {hasMore ? (
              <div
                ref={loadMoreSentinelRef}
                className={styles.loadMoreContainer}
              >
                <button
                  type="button"
                  onClick={() =>
                    setRenderedCount((prev) =>
                      Math.min(prev + ICON_CHUNK_SIZE, filteredIcons.length),
                    )
                  }
                  className={cn(styles.btnPrimary, "font-nunito")}
                >
                  Load More Icons
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>

      {/* Modal Code Inspector */}
      {activeIconSet ? (
        <div
          className={styles.modalOverlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveIconSet(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="icon-inspector-title"
            className={styles.modal}
          >
            <button
              type="button"
              onClick={() => setActiveIconSet(null)}
              className={styles.modalClose}
              aria-label="Close icon inspector"
            >
              <X className="w-4 h-4" />
            </button>

            <div className={styles.modalPreview}>
              <div
                className={cn(
                  styles.modalPreviewBox,
                  isDarkCards && styles.modalPreviewBoxDark,
                )}
                style={gridStyleVars}
              >
                {activeModalPaths ? (
                  <IconSvgPreview
                    paths={activeModalPaths}
                    size={activeIconSet.size}
                  />
                ) : null}
              </div>
            </div>

            <div className={styles.modalHeaderMeta}>
              <h2
                id="icon-inspector-title"
                className={cn(styles.modalTitle, "font-audiowide")}
              >
                {activeIconSet.iconName}
              </h2>
              <span className={cn(styles.modalFamilyBadge, "font-nunito")}>
                {activeIconSet.family === "sduo" ? "S Duo" : "Duo"}
              </span>
            </div>

            <div className="flex justify-center">
              <div
                className={styles.modalWeightSwitcher}
                role="tablist"
                aria-label="Icon weight"
              >
                {ICON_WEIGHTS.map((weight) => {
                  const isActive = modalWeight === weight.id;
                  return (
                    <button
                      key={weight.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setModalWeight(weight.id)}
                      className={cn(
                        styles.modalWeightBtn,
                        "font-nunito",
                        isActive && styles.modalWeightBtnActive,
                      )}
                    >
                      {weight.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={handleCopySvg}
                className={cn(styles.btnPrimary, "font-nunito")}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copied ? "Copied to Clipboard!" : "Copy SVG Code"}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSvg}
                className={cn(styles.btnSecondary, "font-nunito")}
              >
                <Download className="w-4 h-4" />
                <span>Download SVG</span>
              </button>
            </div>

            <pre className={styles.codeBlock}>{modalSvgCode}</pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}
