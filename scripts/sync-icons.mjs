import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const DEFAULT_SOURCE_PATH = "/Users/tumerorkun/projects/fontawesome/src/preview-icons.js";
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "icons-data");
const INITIAL_CHUNK_SIZE = 84;
const DEFAULT_SIZE = 640;

const FAMILIES = [
  { id: "duo", label: "Duo" },
  { id: "sduo", label: "S Duo" },
];

function resolveSourcePath() {
  const args = process.argv.slice(2);
  const sourceFlagIndex = args.indexOf("--source");
  if (sourceFlagIndex !== -1 && args[sourceFlagIndex + 1]) {
    return path.resolve(args[sourceFlagIndex + 1]);
  }
  const sourceEqArg = args.find((arg) => arg.startsWith("--source="));
  if (sourceEqArg) {
    return path.resolve(sourceEqArg.slice("--source=".length));
  }
  if (process.env.ICON_SOURCE_PATH) {
    return path.resolve(process.env.ICON_SOURCE_PATH);
  }
  return DEFAULT_SOURCE_PATH;
}

function normalizePaths(paths) {
  if (!Array.isArray(paths) || paths.length === 0) {
    return [""];
  }
  const primary = typeof paths[0] === "string" ? paths[0] : "";
  const secondary = typeof paths[1] === "string" ? paths[1] : "";
  if (secondary) {
    return [primary, secondary];
  }
  return [primary];
}

function pathsEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function main() {
  const sourcePath = resolveSourcePath();
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  console.log(`Reading icons from: ${sourcePath}`);
  const raw = fs.readFileSync(sourcePath, "utf8");
  const jsonText = raw
    .replace(/^\s*window\.__ICON_GROUPS__\s*=\s*/, "")
    .replace(/;\s*$/, "")
    .trim();

  const iconGroups = JSON.parse(jsonText);
  if (!iconGroups || typeof iconGroups !== "object") {
    throw new Error("Parsed icon groups payload is not an object.");
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const manifestFamilies = {};
  let detectedSize = DEFAULT_SIZE;

  for (const family of FAMILIES) {
    const solidList = iconGroups[`${family.id}_solid`];
    const regularList = iconGroups[`${family.id}_regular`];
    const lightList = iconGroups[`${family.id}_light`];
    const thinList = iconGroups[`${family.id}_thin`];

    if (
      !Array.isArray(solidList) ||
      !Array.isArray(regularList) ||
      !Array.isArray(lightList) ||
      !Array.isArray(thinList)
    ) {
      throw new Error(`Missing expected weight arrays for family "${family.id}".`);
    }

    if (solidList[0] && typeof solidList[0].width === "number") {
      detectedSize = solidList[0].width;
    }

    const buildWeightMap = (list) => {
      const map = new Map();
      for (const item of list) {
        if (item && typeof item.iconName === "string") {
          map.set(item.iconName, normalizePaths(item.paths));
        }
      }
      return map;
    };

    const regularMap = buildWeightMap(regularList);
    const lightMap = buildWeightMap(lightList);
    const thinMap = buildWeightMap(thinList);

    const tuples = [];
    for (const solidItem of solidList) {
      if (!solidItem || typeof solidItem.iconName !== "string") {
        continue;
      }
      const solidPaths = normalizePaths(solidItem.paths);
      const regPaths = regularMap.get(solidItem.iconName);
      const lightPaths = lightMap.get(solidItem.iconName);
      const thinPaths = thinMap.get(solidItem.iconName);

      tuples.push([
        solidItem.iconName,
        solidPaths,
        regPaths && !pathsEqual(regPaths, solidPaths) ? regPaths : null,
        lightPaths && !pathsEqual(lightPaths, solidPaths) ? lightPaths : null,
        thinPaths && !pathsEqual(thinPaths, solidPaths) ? thinPaths : null,
      ]);
    }

    const total = tuples.length;
    const fullPayload = {
      family: family.id,
      size: detectedSize,
      total,
      icons: tuples,
    };
    const initialPayload = {
      family: family.id,
      size: detectedSize,
      total,
      icons: tuples.slice(0, INITIAL_CHUNK_SIZE),
    };

    const fullPath = path.join(OUTPUT_DIR, `${family.id}.json`);
    const initialPath = path.join(OUTPUT_DIR, `${family.id}-initial.json`);

    const fullJson = JSON.stringify(fullPayload);
    const initialJson = JSON.stringify(initialPayload);

    fs.writeFileSync(fullPath, fullJson, "utf8");
    fs.writeFileSync(initialPath, initialJson, "utf8");

    manifestFamilies[family.id] = {
      label: family.label,
      count: total,
    };

    console.log(
      `[${family.id}] ${total} icons -> ${path.relative(PROJECT_ROOT, fullPath)} (${formatBytes(Buffer.byteLength(fullJson))}), ${path.relative(PROJECT_ROOT, initialPath)} (${formatBytes(Buffer.byteLength(initialJson))})`
    );
  }

  const manifest = {
    size: detectedSize,
    generatedAt: new Date().toISOString(),
    families: manifestFamilies,
  };
  const manifestPath = path.join(OUTPUT_DIR, "manifest.json");
  const manifestJson = JSON.stringify(manifest, null, 2) + "\n";
  fs.writeFileSync(manifestPath, manifestJson, "utf8");

  console.log(
    `[manifest] -> ${path.relative(PROJECT_ROOT, manifestPath)} (${formatBytes(Buffer.byteLength(manifestJson))})`
  );
}

main();
