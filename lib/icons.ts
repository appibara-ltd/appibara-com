export type IconFamily = "duo" | "sduo";
export type IconWeight = "solid" | "regular" | "light" | "thin";

export type IconPaths = readonly [string] | readonly [string, string];

export type IconTuple = readonly [
  string,
  IconPaths,
  IconPaths | null,
  IconPaths | null,
  IconPaths | null,
];

export interface IconCatalogPayload {
  family: IconFamily;
  size: number;
  total: number;
  icons: IconTuple[];
}

export interface IconSet {
  iconName: string;
  family: IconFamily;
  size: number;
  solid: IconPaths;
  regular: IconPaths;
  light: IconPaths;
  thin: IconPaths;
}

export interface IconManifest {
  size: number;
  generatedAt: string;
  families: Record<IconFamily, { label: string; count: number }>;
}

export const ICON_CHUNK_SIZE = 84;

export const DEFAULT_PRIMARY_COLOR = "#e17100ff";
export const DEFAULT_SECONDARY_COLOR = "#ffb90073";

export const ICON_FAMILIES: ReadonlyArray<{ id: IconFamily; label: string }> = [
  { id: "duo", label: "Duo" },
  { id: "sduo", label: "S Duo" },
];

export const ICON_WEIGHTS: ReadonlyArray<{ id: IconWeight; label: string }> = [
  { id: "solid", label: "Solid" },
  { id: "regular", label: "Regular" },
  { id: "light", label: "Light" },
  { id: "thin", label: "Thin" },
];

/**
 * Expands compact JSON icon tuples into full IconSet records, falling back
 * missing or deduplicated weights to the solid paths.
 */
export function expandIconCatalog(payload: IconCatalogPayload): IconSet[] {
  const { family, size, icons } = payload;
  return icons.map(([iconName, solid, regular, light, thin]) => ({
    iconName,
    family,
    size,
    solid,
    regular: regular ?? solid,
    light: light ?? solid,
    thin: thin ?? solid,
  }));
}

export interface ParsedHexAlpha {
  hex: string;
  opacity: number;
  alphaHex: string;
}

/**
 * Parses #rgb, #rgba, #rrggbb, or #rrggbbaa strings into a normalized 6-digit
 * hex color, 2-digit alpha hex, and 0..1 opacity value.
 */
export function parseHexAlpha(
  value: string,
  fallbackHex = "#e17100",
): ParsedHexAlpha {
  const cleaned = value.trim().replace(/^#/, "");

  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    const [r, g, b] = cleaned;
    return {
      hex: `#${r}${r}${g}${g}${b}${b}`.toLowerCase(),
      opacity: 1,
      alphaHex: "ff",
    };
  }

  if (/^[0-9a-fA-F]{4}$/.test(cleaned)) {
    const [r, g, b, a] = cleaned;
    const alphaHex = `${a}${a}`.toLowerCase();
    return {
      hex: `#${r}${r}${g}${g}${b}${b}`.toLowerCase(),
      opacity: Number((parseInt(alphaHex, 16) / 255).toFixed(2)),
      alphaHex,
    };
  }

  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return {
      hex: `#${cleaned}`.toLowerCase(),
      opacity: 1,
      alphaHex: "ff",
    };
  }

  if (/^[0-9a-fA-F]{8}$/.test(cleaned)) {
    const hex = `#${cleaned.slice(0, 6)}`.toLowerCase();
    const alphaHex = cleaned.slice(6, 8).toLowerCase();
    return {
      hex,
      opacity: Number((parseInt(alphaHex, 16) / 255).toFixed(2)),
      alphaHex,
    };
  }

  return {
    hex: fallbackHex,
    opacity: 1,
    alphaHex: "ff",
  };
}

/**
 * Builds standalone SVG markup for a dual-tone icon with customizable colors and per-layer opacity.
 */
export function createSvgString(
  paths: IconPaths,
  size: number,
  primaryColor: string,
  secondaryColor: string,
): string {
  const primaryPath = paths[0] ?? "";
  const secondaryPath = paths[1] ?? "";
  const primary = parseHexAlpha(primaryColor, "#e17100");
  const secondary = parseHexAlpha(secondaryColor, "#ffb900");

  const pathElements: string[] = [];
  if (secondaryPath) {
    const opacityAttr =
      secondary.opacity < 1 ? ` fill-opacity="${secondary.opacity}"` : "";
    pathElements.push(
      `  <path fill="${secondary.hex}"${opacityAttr} d="${secondaryPath}" />`,
    );
  }
  if (primaryPath) {
    const opacityAttr =
      primary.opacity < 1 ? ` fill-opacity="${primary.opacity}"` : "";
    pathElements.push(
      `  <path fill="${primary.hex}"${opacityAttr} d="${primaryPath}" />`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="100%">\n${pathElements.join("\n")}\n</svg>`;
}
