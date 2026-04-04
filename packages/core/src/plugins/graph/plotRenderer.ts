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

/**
 * Render a graph config to an SVG string using Plotly.js.
 * Uses an off-screen div — returns the raw SVG markup.
 */
export async function renderGraphToSvg(
  config: GraphConfig
): Promise<{ svg: string; width: number; height: number }> {
  const { functions, dataTraces, axis, width, height } = config;

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
      traces.push({
        x,
        y,
        type: "scatter",
        mode: "lines",
        name: fn.label || fn.expression,
        line: { color: fn.color, width: 2.5 },
      });
    } catch {
      // Skip invalid functions
    }
  }

  // Build Plotly traces from data traces
  for (const dt of dataTraces) {
    traces.push({
      x: dt.xValues,
      y: dt.yValues,
      type: "scatter",
      mode: dt.mode === "scatter" ? "markers" : "lines",
      name: dt.label || "Data",
      marker: { color: dt.color, size: 6 },
      line: { color: dt.color, width: 2 },
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
      zeroline: true,
      zerolinewidth: 1.5,
      zerolinecolor: "#444",
      dtick: axis.tickInterval,
    },
    yaxis: {
      range: [axis.yMin, axis.yMax],
      title: { text: axis.yLabel },
      showgrid: axis.showGrid,
      zeroline: true,
      zerolinewidth: 1.5,
      zerolinecolor: "#444",
      dtick: axis.tickInterval,
    },
    margin: { l: 50, r: 30, t: 20, b: 50 },
    paper_bgcolor: config.backgroundColor === "transparent" ? "rgba(0,0,0,0)" : config.backgroundColor,
    plot_bgcolor: config.backgroundColor === "transparent" ? "rgba(0,0,0,0)" : config.backgroundColor,
    showlegend: traces.length > 1,
    legend: { x: 0.02, y: 0.98 },
    font: { family: "Arial, sans-serif", size: 12 },
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
    if (config.backgroundColor === "transparent") {
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
