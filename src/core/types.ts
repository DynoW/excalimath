/**
 * @module types
 *
 * Core type definitions shared across all ExcaliMath plugins.
 * These types define the metadata contract between the element factory,
 * state bridge, and individual plugin modules.
 */

/** Metadata attached to ExcaliMath-managed elements via Excalidraw's customData field */
export interface ExcalimathMetadata {
  excalimath_type: "equation" | "graph";
  excalimath_source: string;
  /** For equations: the raw LaTeX string */
  excalimath_latex?: string;
  /** For graphs: the serialised plot config JSON */
  excalimath_graph_config?: string;
}

export interface InsertElementOptions {
  /** SVG string to convert into an Excalidraw image element */
  svg: string;
  /** Width of the rendered element */
  width: number;
  /** Height of the rendered element */
  height: number;
  /** Metadata to attach for click-to-edit */
  metadata: ExcalimathMetadata;
  /** Position on canvas (defaults to centre of viewport) */
  x?: number;
  y?: number;
}

export interface ExcalimathPlugin {
  name: string;
  type: ExcalimathMetadata["excalimath_type"];
}
