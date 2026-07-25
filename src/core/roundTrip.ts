/**
 * @module roundTrip
 *
 * Handles re-rendering of ExcaliMath elements when loading a saved
 * .excalidraw file. Scans all elements for ExcaliMath customData,
 * then regenerates the SVG image files so they display correctly.
 *
 * This is needed because Excalidraw stores image elements as references
 * to file entries (by fileId), but the actual file data (SVG data URLs)
 * is not always persisted. This module rebuilds them from metadata.
 */

import { isExcalimathElement, getExcalimathMetadata, svgToDataUrl, createFileEntry } from "./elementFactory";
import { renderLatexToSvg } from "../plugins/equation/renderer";

/**
 * Scan all elements in a scene and regenerate file entries for any
 * ExcaliMath-managed image elements. Call this after loading a
 * .excalidraw file to restore equation and graph rendering.
 *
 * @returns Array of file entries to pass to excalidrawAPI.addFiles()
 */
export function restoreExcalimathFiles(
  elements: Array<{ id: string; type: string; fileId?: string; customData?: Record<string, unknown> }>
): Array<{ id: string; dataURL: string; mimeType: string; created: number; lastRetrieved: number }> {
  const files: Array<{ id: string; dataURL: string; mimeType: string; created: number; lastRetrieved: number }> = [];

  for (const el of elements) {
    if (el.type !== "image" || !isExcalimathElement(el) || !el.fileId) continue;

    const meta = getExcalimathMetadata(el);
    if (!meta) continue;

    if (meta.excalimath_type === "equation" && meta.excalimath_latex) {
      try {
        const result = renderLatexToSvg(meta.excalimath_latex);
        const dataUrl = svgToDataUrl(result.svg);
        const { fileEntry } = createFileEntry(dataUrl, el.fileId);
        files.push(fileEntry);
      } catch {
        // Skip elements that fail to re-render
      }
    }

    if (meta.excalimath_type === "graph" && meta.excalimath_graph_config) {
      // Graph re-rendering is async (Plotly), so we store a placeholder
      // and the actual re-render happens via restoreGraphFiles()
      // For now, graphs that were saved with their SVG data URL intact
      // will work. Full async restoration is handled separately.
    }
  }

  return files;
}

/**
 * Async version that also restores graph elements (requires Plotly).
 * Call this after the initial sync restore for full fidelity.
 */
export async function restoreExcalimathFilesAsync(
  elements: Array<{ id: string; type: string; fileId?: string; customData?: Record<string, unknown> }>
): Promise<Array<{ id: string; dataURL: string; mimeType: string; created: number; lastRetrieved: number }>> {
  // Start with sync equation restores
  const files = restoreExcalimathFiles(elements);

  // Lazily import graph renderer to avoid loading Plotly if not needed
  for (const el of elements) {
    if (el.type !== "image" || !isExcalimathElement(el) || !el.fileId) continue;

    const meta = getExcalimathMetadata(el);
    if (!meta || meta.excalimath_type !== "graph" || !meta.excalimath_graph_config) continue;

    try {
      const config = JSON.parse(meta.excalimath_graph_config);
      const { renderGraphToSvg } = await import("../plugins/graph/plotRenderer");
      const result = await renderGraphToSvg(config);
      const dataUrl = svgToDataUrl(result.svg);
      const { fileEntry } = createFileEntry(dataUrl, el.fileId);
      files.push(fileEntry);
    } catch {
      // Skip elements that fail to re-render
    }
  }

  return files;
}

/**
 * Extract all ExcaliMath metadata from a scene's elements.
 * Useful for serialisation or inspection.
 */
export function extractExcalimathData(
  elements: Array<{ id: string; customData?: Record<string, unknown> }>
): Array<{ elementId: string; type: string; data: Record<string, unknown> }> {
  const results: Array<{ elementId: string; type: string; data: Record<string, unknown> }> = [];

  for (const el of elements) {
    if (!isExcalimathElement(el)) continue;
    const meta = getExcalimathMetadata(el);
    if (!meta) continue;
    results.push({
      elementId: el.id,
      type: meta.excalimath_type,
      data: meta as unknown as Record<string, unknown>,
    });
  }

  return results;
}
