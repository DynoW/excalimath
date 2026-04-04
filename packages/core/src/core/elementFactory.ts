/**
 * @module elementFactory
 *
 * Converts rendered SVG content (from KaTeX, Plotly, or inline SVG shapes)
 * into Excalidraw-compatible `imageElement` objects with embedded data URLs.
 *
 * This is the bridge between plugin renderers and the Excalidraw canvas.
 * Elements created here carry `customData` metadata that enables click-to-edit.
 */

import type { InsertElementOptions, ExcalimathMetadata } from "./types";

/** Generate a random ID compatible with Excalidraw element IDs */
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

/** Convert an SVG string to a data URL suitable for Excalidraw imageElement */
export function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}

/** Create a File-like entry for the Excalidraw files map */
export function createFileEntry(dataUrl: string, id?: string) {
  const fileId = id ?? generateId();
  return {
    fileId,
    fileEntry: {
      mimeType: "image/svg+xml" as const,
      id: fileId,
      dataURL: dataUrl,
      created: Date.now(),
      lastRetrieved: Date.now(),
    },
  };
}

/**
 * Build an Excalidraw-compatible image element from an SVG.
 * Returns { element, fileEntry } for insertion via the Excalidraw API.
 */
export function createImageElement(options: InsertElementOptions) {
  const { svg, width, height, metadata, x = 100, y = 100 } = options;

  const dataUrl = svgToDataUrl(svg);
  const { fileId, fileEntry } = createFileEntry(dataUrl);
  const elementId = generateId();

  const element = {
    id: elementId,
    type: "image" as const,
    x,
    y,
    width,
    height,
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
    customData: metadata as unknown as Record<string, unknown>,
  };

  return { element, fileEntry, fileId, elementId };
}

/** Check if an element is managed by ExcaliMath */
export function isExcalimathElement(
  element: { customData?: Record<string, unknown> } | null | undefined
): boolean {
  return !!element?.customData?.excalimath_type;
}

/** Extract ExcaliMath metadata from an element */
export function getExcalimathMetadata(
  element: { customData?: Record<string, unknown> }
): ExcalimathMetadata | null {
  if (!isExcalimathElement(element)) return null;
  return element.customData as unknown as ExcalimathMetadata;
}
