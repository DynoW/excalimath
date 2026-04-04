import type { GraphConfig } from "./types";
import { TRACE_COLORS, createDefaultAxisConfig } from "./types";

export interface PlotTemplate {
  name: string;
  description: string;
  config: GraphConfig;
}

export const plotTemplates: PlotTemplate[] = [
  {
    name: "Linear Function",
    description: "y = x",
    config: {
      functions: [{ expression: "x", color: TRACE_COLORS[0], label: "y = x" }],
      dataTraces: [],
      axis: createDefaultAxisConfig(),
      width: 500,
      height: 400,
      backgroundColor: "transparent",
    },
  },
  {
    name: "Parabola",
    description: "y = x\u00B2",
    config: {
      functions: [
        { expression: "x^2", color: TRACE_COLORS[0], label: "y = x\u00B2" },
      ],
      dataTraces: [],
      axis: { ...createDefaultAxisConfig(), yMin: -2, yMax: 20 },
      width: 500,
      height: 400,
      backgroundColor: "transparent",
    },
  },
  {
    name: "Trigonometric Functions",
    description: "sin(x) and cos(x)",
    config: {
      functions: [
        { expression: "sin(x)", color: TRACE_COLORS[0], label: "sin(x)" },
        { expression: "cos(x)", color: TRACE_COLORS[1], label: "cos(x)" },
      ],
      dataTraces: [],
      axis: {
        xMin: -2 * Math.PI,
        xMax: 2 * Math.PI,
        yMin: -1.5,
        yMax: 1.5,
        xLabel: "x",
        yLabel: "y",
        showGrid: true,
      },
      width: 500,
      height: 400,
      backgroundColor: "transparent",
    },
  },
  {
    name: "Unit Circle",
    description: "\u00B1\u221A(1 \u2212 x\u00B2)",
    config: {
      functions: [
        {
          expression: "sqrt(1 - x^2)",
          color: TRACE_COLORS[0],
          label: "upper",
        },
        {
          expression: "-sqrt(1 - x^2)",
          color: TRACE_COLORS[0],
          label: "lower",
        },
      ],
      dataTraces: [],
      axis: {
        xMin: -1.5,
        xMax: 1.5,
        yMin: -1.5,
        yMax: 1.5,
        xLabel: "x",
        yLabel: "y",
        showGrid: true,
      },
      width: 450,
      height: 450,
      backgroundColor: "transparent",
    },
  },
  {
    name: "Number Line",
    description: "Horizontal axis from -10 to 10",
    config: {
      functions: [
        { expression: "0", color: TRACE_COLORS[0], label: "" },
      ],
      dataTraces: [],
      axis: {
        xMin: -10,
        xMax: 10,
        yMin: -1,
        yMax: 1,
        xLabel: "",
        yLabel: "",
        showGrid: false,
        tickInterval: 1,
      },
      width: 600,
      height: 150,
      backgroundColor: "transparent",
    },
  },
  {
    name: "Exponential Growth",
    description: "y = e\u02E3",
    config: {
      functions: [
        { expression: "exp(x)", color: TRACE_COLORS[0], label: "y = e\u02E3" },
      ],
      dataTraces: [],
      axis: {
        xMin: -3,
        xMax: 3,
        yMin: -1,
        yMax: 20,
        xLabel: "x",
        yLabel: "y",
        showGrid: true,
      },
      width: 500,
      height: 400,
      backgroundColor: "transparent",
    },
  },
  {
    name: "Absolute Value",
    description: "y = |x|",
    config: {
      functions: [
        { expression: "abs(x)", color: TRACE_COLORS[0], label: "y = |x|" },
      ],
      dataTraces: [],
      axis: createDefaultAxisConfig(),
      width: 500,
      height: 400,
      backgroundColor: "transparent",
    },
  },
];
