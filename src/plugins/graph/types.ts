/** A single function trace on the graph */
export interface FunctionTrace {
  /** Math expression string, e.g. "sin(x)", "x^2 + 2*x" */
  expression: string;
  /** Display colour */
  color: string;
  /** Optional label for the legend */
  label?: string;
}

/** A data trace from CSV / tabular input */
export interface DataTrace {
  xValues: number[];
  yValues: number[];
  mode: "scatter" | "line";
  color: string;
  label?: string;
}

/** Axis configuration */
export interface AxisConfig {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xLabel: string;
  yLabel: string;
  showGrid: boolean;
  tickInterval?: number;
}

/** Full graph configuration stored in element customData for click-to-edit */
export interface GraphConfig {
  functions: FunctionTrace[];
  dataTraces: DataTrace[];
  axis: AxisConfig;
  width: number;
  height: number;
  /** Background colour — "transparent" or a CSS colour string */
  backgroundColor: string;
}

/** Available colours for function traces */
export const TRACE_COLORS = [
  "#6965db", // purple
  "#e03131", // red
  "#2f9e44", // green
  "#e8590c", // orange
  "#1971c2", // blue
];

export function createDefaultAxisConfig(): AxisConfig {
  return {
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
    xLabel: "x",
    yLabel: "y",
    showGrid: true,
  };
}

export function createDefaultGraphConfig(): GraphConfig {
  return {
    functions: [{ expression: "", color: TRACE_COLORS[0] }],
    dataTraces: [],
    axis: createDefaultAxisConfig(),
    width: 500,
    height: 400,
    backgroundColor: "transparent",
  };
}
