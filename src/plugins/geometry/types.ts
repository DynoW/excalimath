/** A single shape in a library pack */
export interface LibraryShape {
  /** Display name */
  name: string;
  /** Excalidraw elements that compose this shape (for native element shapes) */
  elements: ExcalidrawLibElement[];
  /** SVG markup (for shapes that need smooth curves — rendered as image element) */
  svg?: string;
  /** Width of the SVG shape */
  svgWidth?: number;
  /** Height of the SVG shape */
  svgHeight?: number;
}

/** Minimal Excalidraw element shape for library items */
export interface ExcalidrawLibElement {
  type: "rectangle" | "ellipse" | "line" | "arrow" | "text" | "diamond" | "freedraw";
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  strokeColor?: string;
  backgroundColor?: string;
  fillStyle?: "hachure" | "cross-hatch" | "solid";
  strokeWidth?: number;
  roughness?: number;
  opacity?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: number;
  textAlign?: "left" | "center" | "right";
  points?: [number, number][];
  startArrowhead?: "arrow" | null;
  endArrowhead?: "arrow" | null;
  roundness?: { type: number } | null;
}

/** A library pack containing related shapes */
export interface LibraryPack {
  name: string;
  description: string;
  gradeRange: string;
  shapes: LibraryShape[];
  enabled: boolean;
}
