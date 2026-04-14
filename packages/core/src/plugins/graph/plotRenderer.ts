/**
 * @module graph/plotRenderer
 *
 * Renders graph configurations to SVG using Plotly.js in an off-screen
 * container. The SVG output is then converted to a data URL for embedding
 * as an Excalidraw image element.
 */

import Plotly from "plotly.js-dist-min";
import { evaluateFunction } from "./evaluator";
import type { GraphConfig } from "./types";

type RenderPurpose = "preview" | "insert";

interface RenderOptions {
  isDark?: boolean;
  purpose?: RenderPurpose;
}

function parseHexColor(input: string): { r: number; g: number; b: number } | null {
  const value = input.trim().toLowerCase();
  if (!value.startsWith("#")) return null;

  const hex = value.slice(1);
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return { r, g, b };
  }

  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }

  return null;
}

function isDarkHexColor(hex: string): boolean {
  const rgb = parseHexColor(hex);
  if (!rgb) return false;
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance < 0.5;
}

function toHex(n: number): string {
  return Math.max(0, Math.min(255, Math.round(n)))
    .toString(16)
    .padStart(2, "0");
}

function brightenHex(hex: string, amount = 0.45): string {
  const rgb = parseHexColor(hex);
  if (!rgb) return hex;
  const r = rgb.r + (255 - rgb.r) * amount;
  const g = rgb.g + (255 - rgb.g) * amount;
  const b = rgb.b + (255 - rgb.b) * amount;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getVisibleTraceColor(color: string, isDarkBackground: boolean): string {
  if (!isDarkBackground) return color;
  if (!color.startsWith("#")) return color;
  return isDarkHexColor(color) ? brightenHex(color, 0.5) : color;
}

function getPalette(config: GraphConfig, options: RenderOptions) {
  const isTransparentBg = config.backgroundColor === "transparent";
  const useDarkPaletteForTransparent =
    isTransparentBg && options.purpose === "preview" && !!options.isDark;
  const isDarkBackground =
    useDarkPaletteForTransparent ||
    (!isTransparentBg && isDarkHexColor(config.backgroundColor));

  return {
    isTransparentBg,
    isDarkBackground,
    axisColor: isDarkBackground ? "#e5e7eb" : "#1f2937",
    gridColor: isDarkBackground
      ? "rgba(229,231,235,0.28)"
      : "rgba(31,41,55,0.18)",
  };
}

/**
 * Render a graph config to an SVG string using Plotly.js.
 * Uses an off-screen div — returns the raw SVG markup.
 */
export async function renderGraphToSvg(
  config: GraphConfig,
  options: RenderOptions = {}
): Promise<{ svg: string; width: number; height: number }> {
  const { functions, dataTraces, axis, width, height } = config;
  const { isTransparentBg, isDarkBackground, axisColor, gridColor } = getPalette(
    config,
    options
  );

  // Build Plotly traces from function expressions
  const traces: Plotly.Data[] = [];

  for (const fn of functions) {
    if (!fn.expression.trim()) continue;
    try {
      const { x, y } = evaluateFunction(
        fn.expression,
        axis.xMin,
        axis.xMax
      );
      const visibleColor = getVisibleTraceColor(fn.color, isDarkBackground);
      traces.push({
        x,
        y,
        type: "scatter",
        mode: "lines",
        name: fn.label || fn.expression,
        line: { color: visibleColor, width: 2.5 },
      });
    } catch {
      // Skip invalid functions
    }
  }

  // Build Plotly traces from data traces
  for (const dt of dataTraces) {
    const visibleColor = getVisibleTraceColor(dt.color, isDarkBackground);
    traces.push({
      x: dt.xValues,
      y: dt.yValues,
      type: "scatter",
      mode: dt.mode === "scatter" ? "markers" : "lines",
      name: dt.label || "Data",
      marker: { color: visibleColor, size: 6 },
      line: { color: visibleColor, width: 2 },
    });
  }

  if (traces.length === 0) {
    throw new Error("No valid traces to plot");
  }

  const layout: Partial<Plotly.Layout> = {
    width,
    height,
    xaxis: {
      range: [axis.xMin, axis.xMax],
      title: { text: axis.xLabel },
      showgrid: axis.showGrid,
      color: axisColor,
      gridcolor: gridColor,
      zeroline: true,
      zerolinewidth: 1.5,
      zerolinecolor: axisColor,
      dtick: axis.tickInterval,
    },
    yaxis: {
      range: [axis.yMin, axis.yMax],
      title: { text: axis.yLabel },
      showgrid: axis.showGrid,
      color: axisColor,
      gridcolor: gridColor,
      zeroline: true,
      zerolinewidth: 1.5,
      zerolinecolor: axisColor,
      dtick: axis.tickInterval,
    },
    margin: { l: 30, r: 20, t: 20, b: 30 }, // Margins of svg
    paper_bgcolor: isTransparentBg ? "rgba(0,0,0,0)" : config.backgroundColor,
    plot_bgcolor: isTransparentBg ? "rgba(0,0,0,0)" : config.backgroundColor,
    showlegend: traces.length > 1,
    legend: { x: 0.02, y: 0.98, font: { color: axisColor } },
    font: { family: "Arial, sans-serif", size: 12, color: axisColor },
  };

  // Render into off-screen container
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.visibility = "hidden";
  document.body.appendChild(container);

  try {
    await Plotly.newPlot(container, traces, layout, {
      staticPlot: true,
      responsive: false,
    });

    const svgElement = container.querySelector("svg");
    if (!svgElement) {
      throw new Error("Plotly did not generate SVG output");
    }

    // Strip background rects when transparent mode is active
    if (isTransparentBg) {
      svgElement.querySelectorAll("rect.bg").forEach((el) => el.remove());
      const mainBg = svgElement.querySelector(".main-svg > rect");
      if (mainBg) mainBg.setAttribute("fill", "none");
    }

    // Add xmlns for standalone SVG
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const svg = svgElement.outerHTML;

    Plotly.purge(container);
    return { svg, width, height };
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Parse CSV text into x/y arrays for data plot mode.
 * Expects rows of "x,y" values, one per line. Header row is auto-detected.
 */
export function parseCsvData(
  csv: string
): { xValues: number[]; yValues: number[] } {
  const lines = csv.trim().split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) throw new Error("No data found");

  const xValues: number[] = [];
  const yValues: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(/[,\t]+/).map((s) => s.trim());
    if (parts.length < 2) continue;

    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);

    // Skip header row (non-numeric)
    if (isNaN(x) || isNaN(y)) {
      if (i === 0) continue; // likely header
      continue;
    }

    xValues.push(x);
    yValues.push(y);
  }

  if (xValues.length === 0) throw new Error("No valid numeric data found");
  return { xValues, yValues };
}
