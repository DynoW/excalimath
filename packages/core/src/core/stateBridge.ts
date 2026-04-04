/**
 * @module stateBridge
 *
 * Manages click-to-edit by inspecting the currently selected Excalidraw
 * elements and determining if an ExcaliMath-managed element is selected.
 *
 * When a user clicks an equation or graph on the canvas, this module reads
 * the `customData` metadata to determine the element type and source data,
 * enabling the correct editor panel to re-open with the original settings.
 */

import { getExcalimathMetadata } from "../core/elementFactory";
import type { ExcalimathMetadata } from "../core/types";

export type { ExcalimathMetadata };

export interface SelectedEquation {
  elementId: string;
  latex: string;
}

export interface SelectedGraph {
  elementId: string;
  config: string;
}

/**
 * Inspect the currently selected Excalidraw elements and determine
 * if an ExcaliMath element is selected for editing.
 */
export function getSelectedExcalimathElement(
  selectedElements: Array<{ id: string; customData?: Record<string, unknown> }>
): { type: "equation"; data: SelectedEquation } | { type: "graph"; data: SelectedGraph } | null {
  if (selectedElements.length !== 1) return null;

  const el = selectedElements[0];
  const meta = getExcalimathMetadata(el);
  if (!meta) return null;

  if (meta.excalimath_type === "equation" && meta.excalimath_latex) {
    return {
      type: "equation",
      data: { elementId: el.id, latex: meta.excalimath_latex },
    };
  }

  if (meta.excalimath_type === "graph" && meta.excalimath_graph_config) {
    return {
      type: "graph",
      data: { elementId: el.id, config: meta.excalimath_graph_config },
    };
  }

  return null;
}
