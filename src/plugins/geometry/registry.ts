/**
 * @module geometry/registry
 *
 * Central registry for all shape library packs. Handles converting
 * LibraryShape definitions into Excalidraw-ready elements (both native
 * elements and SVG image elements for shapes with smooth curves).
 *
 * Also provides cross-pack search.
 */

import type { LibraryPack, LibraryShape, ExcalidrawLibElement } from "./types";
import { FONT_FAMILY } from "@excalidraw/excalidraw";
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

/** Measure text width and height using offscreen canvas (matching Excalidraw's approach) */
let canvas: HTMLCanvasElement | null = null;
function getCanvasContext(): CanvasRenderingContext2D {
  if (!canvas) {
    canvas = document.createElement("canvas");
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context not available");
  }
  return ctx;
}

/** Font-family names + fallback chains, matching Excalidraw's internal getFontFamilyString */
const FONT_FAMILY_NAMES: Record<number, string> = {
  [FONT_FAMILY.Virgil]: "Virgil, Segoe UI Emoji",
  [FONT_FAMILY.Helvetica]: "Helvetica, Segoe UI Emoji",
  [FONT_FAMILY.Cascadia]: "Cascadia, Segoe UI Emoji",
  [FONT_FAMILY.Excalifont]: "Excalifont, Xiaolai, Segoe UI Emoji",
  [FONT_FAMILY.Nunito]: "Nunito, Segoe UI Emoji",
  [FONT_FAMILY["Lilita One"]]: "Lilita One, Segoe UI Emoji",
  [FONT_FAMILY["Comic Shanns"]]: "Comic Shanns, Segoe UI Emoji",
  [FONT_FAMILY["Liberation Sans"]]: "Liberation Sans, Segoe UI Emoji",
};

function getFontString(fontSize: number, fontFamily: number): string {
  const name = FONT_FAMILY_NAMES[fontFamily] || FONT_FAMILY_NAMES[FONT_FAMILY.Virgil];
  return `${fontSize}px ${name}`;
}

/** Per-family line heights, matching Excalidraw's internal FONT_METADATA */
const LINE_HEIGHTS: Record<number, number> = {
  [FONT_FAMILY.Virgil]: 1.25,
  [FONT_FAMILY.Helvetica]: 1.15,
  [FONT_FAMILY.Cascadia]: 1.2,
  [FONT_FAMILY.Excalifont]: 1.25,
  [FONT_FAMILY.Nunito]: 1.35,
  [FONT_FAMILY["Lilita One"]]: 1.15,
  [FONT_FAMILY["Comic Shanns"]]: 1.25,
  [FONT_FAMILY["Liberation Sans"]]: 1.15,
};

function measureText(text: string, fontSize: number, fontFamily: number): { width: number; height: number } {
  const lineHeight = LINE_HEIGHTS[fontFamily] || 1.25;
  const height = fontSize * lineHeight * text.split("\n").length;
  if (text.trim() === "") {
    return { width: 0, height };
  }
  const ctx = getCanvasContext();
  ctx.font = getFontString(fontSize, fontFamily);
  const lines = text.split("\n");
  let maxWidth = 0;
  for (const line of lines) {
    maxWidth = Math.max(maxWidth, ctx.measureText(line || " ").width);
  }
  return { width: maxWidth, height };
}

/** Compute x offset for text alignment so the text appears at the intended position */
function getTextAlignOffset(
  textAlign: string | undefined,
  definedWidth: number,
  measuredWidth: number,
): number {
  if (textAlign === "center") {
    return (definedWidth - measuredWidth) / 2;
  }
  if (textAlign === "right") {
    return definedWidth - measuredWidth;
  }
  return 0;
}

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
      const fontSize = el.fontSize ?? 16;
      const fontFamily = el.fontFamily ?? 1;
      const text = el.text || "";
      const measured = measureText(text, fontSize, fontFamily);
      const alignOffsetX = getTextAlignOffset(el.textAlign, el.width > 0 ? el.width : measured.width, measured.width);

      return {
        ...base,
        x: base.x + alignOffsetX,
        width: measured.width,
        height: measured.height,
        text,
        fontSize,
        fontFamily,
        textAlign: el.textAlign || "left",
        verticalAlign: "top",
        containerId: null,
        originalText: text,
        autoResize: true,
        lineHeight: LINE_HEIGHTS[fontFamily] || 1.25,
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
