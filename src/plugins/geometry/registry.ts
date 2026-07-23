/**
 * @module geometry/registry
 *
 * Central registry for all shape library packs. Handles converting
 * LibraryShape definitions into Excalidraw-ready elements (both native
 * elements and SVG image elements for shapes with smooth curves).
 *
 * Also provides .excalidrawlib file import and cross-pack search.
 */

import type { LibraryPack, LibraryShape, ExcalidrawLibElement } from "./types";
import { svgToDataUrl, createFileEntry } from "../../core/elementFactory";
import { geometryShapes } from "./packs/geometry";
import { algebraShapes } from "./packs/algebra";
import { statisticsShapes } from "./packs/statistics";
import { physicsShapes } from "./packs/physics";
import { biologyShapes } from "./packs/biology";
import { chemistryShapes } from "./packs/chemistry";

/** All built-in library packs */
export const builtInPacks: LibraryPack[] = [
  {
    name: "Geometry",
    description: "Angles, triangles, circles, polygons, coordinate grids, number lines",
    gradeRange: "K-10",
    shapes: geometryShapes,
    enabled: true,
  },
  {
    name: "Algebra",
    description: "Fraction bars, algebra tiles, balance scales, Venn diagrams, function machine",
    gradeRange: "Gr 3-10",
    shapes: algebraShapes,
    enabled: true,
  },
  {
    name: "Statistics",
    description: "Bar chart, pie chart, histogram, scatter plot, box plot frames",
    gradeRange: "Gr 5-12",
    shapes: statisticsShapes,
    enabled: true,
  },
  {
    name: "Physics / Circuits",
    description: "Resistor, capacitor, battery, switch, LED, logic gates, force arrows",
    gradeRange: "Gr 8-12",
    shapes: physicsShapes,
    enabled: true,
  },
  {
    name: "Biology",
    description: "Animal cell, plant cell, DNA helix, mitosis stages, food web, ecosystem",
    gradeRange: "Gr 5-12",
    shapes: biologyShapes,
    enabled: true,
  },
  {
    name: "Chemistry",
    description: "Atom models, periodic table tiles, bond types, lab equipment",
    gradeRange: "Gr 7-12",
    shapes: chemistryShapes,
    enabled: true,
  },
];

/** Generate a random Excalidraw element ID */
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

export interface ShapeInsertResult {
  elements: Record<string, unknown>[];
  files: Array<{ id: string; dataURL: string; mimeType: string; created: number; lastRetrieved: number }>;
}

/**
 * Convert a LibraryShape into Excalidraw-ready elements
 * with proper IDs, positioned at the given canvas coordinates.
 *
 * Shapes with an `svg` field are inserted as image elements (smooth curves).
 * Shapes with only `elements` are inserted as native Excalidraw elements.
 */
export function shapeToExcalidrawElements(
  shape: LibraryShape,
  x: number,
  y: number
): ShapeInsertResult {
  // If the shape has SVG, insert as an image element
  if (shape.svg) {
    const dataUrl = svgToDataUrl(shape.svg);
    const { fileId, fileEntry } = createFileEntry(dataUrl);
    const elementId = generateId();

    const element = {
      id: elementId,
      type: "image" as const,
      x,
      y,
      width: shape.svgWidth || 90,
      height: shape.svgHeight || 50,
      angle: 0,
      strokeColor: "transparent",
      backgroundColor: "transparent",
      fillStyle: "solid" as const,
      strokeWidth: 0,
      strokeStyle: "solid" as const,
      roughness: 0,
      opacity: 100,
      groupIds: [],
      frameId: null,
      index: null,
      roundness: null,
      seed: Math.floor(Math.random() * 100000),
      version: 1,
      versionNonce: Math.floor(Math.random() * 100000),
      isDeleted: false,
      boundElements: null,
      updated: Date.now(),
      link: null,
      locked: false,
      status: "saved" as const,
      fileId,
      scale: [1, 1] as [number, number],
    };

    return { elements: [element], files: [fileEntry] };
  }

  // Native elements path
  const groupId = generateId();

  const elements = shape.elements.map((el: ExcalidrawLibElement) => {
    const id = generateId();
    const base = {
      id,
      type: el.type,
      x: x + (el.x || 0),
      y: y + (el.y || 0),
      width: el.width || 0,
      height: el.height || 0,
      angle: el.angle || 0,
      strokeColor: el.strokeColor || "#1e1e1e",
      backgroundColor: el.backgroundColor || "transparent",
      fillStyle: el.fillStyle || "solid",
      strokeWidth: el.strokeWidth ?? 2,
      roughness: el.roughness ?? 0,
      opacity: el.opacity ?? 100,
      groupIds: [groupId],
      frameId: null,
      index: null,
      roundness: el.roundness || null,
      seed: Math.floor(Math.random() * 100000),
      version: 1,
      versionNonce: Math.floor(Math.random() * 100000),
      isDeleted: false,
      boundElements: null,
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
        autoResize: true,
        lineHeight: 1.25,
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
  });

  return { elements, files: [] };
}

/**
 * Parse an .excalidrawlib JSON file and return a LibraryPack.
 */
export function parseExcalidrawLib(json: string, name: string): LibraryPack {
  const parsed = JSON.parse(json);
  if (parsed.type !== "excalidrawlib") {
    throw new Error("Invalid file: not an excalidrawlib file");
  }

  const libraryItems = parsed.libraryItems || parsed.library || [];
  const shapes: LibraryShape[] = libraryItems.map(
    (item: { name?: string; elements: ExcalidrawLibElement[] }, i: number) => ({
      name: item.name || `Shape ${i + 1}`,
      elements: item.elements || [],
    })
  );

  return {
    name,
    description: `Imported library: ${name}`,
    gradeRange: "Custom",
    shapes,
    enabled: true,
  };
}

/** Filter shapes across enabled packs by search term */
export function searchShapes(
  packs: LibraryPack[],
  search: string
): Array<{ pack: string; shape: LibraryShape }> {
  const lower = search.toLowerCase();
  const results: Array<{ pack: string; shape: LibraryShape }> = [];

  for (const pack of packs) {
    if (!pack.enabled) continue;
    for (const shape of pack.shapes) {
      if (
        shape.name.toLowerCase().includes(lower) ||
        pack.name.toLowerCase().includes(lower)
      ) {
        results.push({ pack: pack.name, shape });
      }
    }
  }

  return results;
}
