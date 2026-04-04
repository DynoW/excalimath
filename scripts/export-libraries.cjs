/**
 * Export ExcaliMath shape packs as .excalidrawlib files for submission
 * to libraries.excalidraw.com.
 *
 * Usage: node scripts/export-libraries.cjs
 * Output: scripts/output/*.excalidrawlib
 *
 * Reads the shape pack .ts files directly and parses the element arrays.
 * No build step required — works by evaluating the TypeScript source.
 */

const fs = require("fs");
const path = require("path");

function generateId() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

function convertElement(el, groupId) {
  const base = {
    id: generateId(),
    type: el.type,
    x: el.x || 0,
    y: el.y || 0,
    width: el.width || 0,
    height: el.height || 0,
    angle: el.angle || 0,
    strokeColor: el.strokeColor || "#1e1e1e",
    backgroundColor: el.backgroundColor || "transparent",
    fillStyle: el.fillStyle || "solid",
    strokeWidth: el.strokeWidth ?? 2,
    strokeStyle: "solid",
    roughness: el.roughness ?? 0,
    opacity: el.opacity ?? 100,
    groupIds: [groupId],
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 100000),
    isDeleted: false,
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
  };

  if (el.type === "text") {
    return {
      ...base,
      text: el.text || "",
      fontSize: el.fontSize || 16,
      fontFamily: el.fontFamily || 1,
      textAlign: el.textAlign || "left",
      verticalAlign: "top",
      containerId: null,
      originalText: el.text || "",
      baseline: 14,
    };
  }

  if (el.type === "line" || el.type === "arrow") {
    return {
      ...base,
      points: el.points || [[0, 0], [el.width, el.height]],
      startArrowhead: el.startArrowhead ?? null,
      endArrowhead: el.type === "arrow" ? (el.endArrowhead ?? "arrow") : null,
      startBinding: null,
      endBinding: null,
      lastCommittedPoint: null,
    };
  }

  return base;
}

/**
 * Parse a TypeScript shape pack file and extract the shape array.
 * This is a simple approach: strip TS syntax and eval the array.
 */
function loadPackFile(filePath) {
  let src = fs.readFileSync(filePath, "utf-8");

  // Strip TypeScript imports and type annotations
  src = src.replace(/import\s+.*?;/g, "");
  src = src.replace(/:\s*LibraryShape\[\]/g, "");
  src = src.replace(/export\s+const\s+(\w+)\s*=/, "const $1 =");
  // Remove all `as X` type assertions (as const, as [number, number][], etc.)
  src = src.replace(/\s+as\s+\[[^\]]*\]\[\]/g, "");
  src = src.replace(/\s+as\s+const/g, "");
  src = src.replace(/\s+as\s+[A-Za-z"'][^\s,;\n})]*/g, "");

  // Extract the variable name
  const match = src.match(/const\s+(\w+)\s*=/);
  if (!match) throw new Error(`No exported array found in ${filePath}`);
  const varName = match[1];

  // Evaluate and return the array
  const fn = new Function(`${src}\nreturn ${varName};`);
  return fn();
}

// ── Main ──

const packsDir = path.join(__dirname, "..", "packages", "core", "src", "plugins", "geometry", "packs");
const outputDir = path.join(__dirname, "output");
fs.mkdirSync(outputDir, { recursive: true });

const packFiles = [
  { file: "geometry.ts", name: "Geometry" },
  { file: "algebra.ts", name: "Algebra" },
  { file: "statistics.ts", name: "Statistics" },
  { file: "physics.ts", name: "Physics & Circuits" },
  { file: "biology.ts", name: "Biology" },
  { file: "chemistry.ts", name: "Chemistry" },
];

for (const { file, name } of packFiles) {
  const filePath = path.join(packsDir, file);

  let shapes;
  try {
    shapes = loadPackFile(filePath);
  } catch (err) {
    console.error(`Failed to load ${file}:`, err.message);
    continue;
  }

  const libraryItems = [];

  for (const shape of shapes) {
    // Skip SVG-only shapes (logic gates) — not supported in .excalidrawlib
    if (shape.svg && (!shape.elements || shape.elements.length === 0)) {
      console.log(`  [skip] ${shape.name} (SVG-only)`);
      continue;
    }

    const groupId = generateId();
    const elements = shape.elements.map((el) => convertElement(el, groupId));

    libraryItems.push({
      id: generateId(),
      status: "published",
      name: shape.name,
      elements,
      created: Date.now(),
    });
  }

  const library = {
    type: "excalidrawlib",
    version: 2,
    source: "https://github.com/tamerUAE/excalimath",
    libraryItems,
  };

  const filename = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".excalidrawlib";
  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(library, null, 2));
  console.log(`Exported: ${filename} (${libraryItems.length} shapes)`);
}

console.log(`\nAll packs exported to: ${outputDir}/`);
console.log("\nTo submit to libraries.excalidraw.com:");
console.log("1. Go to https://libraries.excalidraw.com");
console.log('2. Click "Add your library"');
console.log("3. Upload each .excalidrawlib file");
