/**
 * @module equation/renderer
 *
 * Renders LaTeX strings to SVG using KaTeX's MathML output mode.
 * MathML is used instead of HTML because it renders natively in the browser
 * without external CSS — critical for data URL images embedded in Excalidraw.
 *
 * Dimensions are measured by briefly inserting the rendered MathML into an
 * off-screen DOM element and reading its bounding box.
 */

import katex from "katex";

export interface RenderResult {
  svg: string;
  width: number;
  height: number;
}

/**
 * Measure the actual rendered size of MathML content by briefly inserting it
 * into an off-screen DOM element.
 */
function measureMathml(
  mathml: string,
  fontSize: number
): { width: number; height: number } {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.visibility = "hidden";
  container.style.fontSize = `${fontSize}px`;
  container.style.display = "inline-block";
  container.innerHTML = mathml;
  document.body.appendChild(container);

  const rect = container.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);

  document.body.removeChild(container);
  return { width, height };
}

/**
 * Render a LaTeX string to an SVG string using KaTeX's MathML output.
 * MathML is rendered natively by the browser — no external CSS required,
 * so it works correctly inside data URL images.
 */
export function renderLatexToSvg(
  latex: string,
  displayMode = true,
  fontSize = 24
): RenderResult {
  // Render LaTeX to MathML — no CSS dependency, works in data URLs
  const mathml = katex.renderToString(latex, {
    displayMode,
    throwOnError: true,
    output: "mathml",
  });

  // Measure actual rendered dimensions from the DOM
  const measured = measureMathml(mathml, fontSize);
  const padding = 20;
  const svgWidth = Math.max(measured.width + padding * 2, 60);
  const svgHeight = Math.max(measured.height + padding * 2, 40);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="
      font-size: ${fontSize}px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: #1e1e1e;
    ">
      ${mathml}
    </div>
  </foreignObject>
</svg>`;

  return { svg, width: svgWidth, height: svgHeight };
}

/**
 * Validate a LaTeX string without rendering.
 * Returns null if valid, or an error message if invalid.
 */
export function validateLatex(latex: string): string | null {
  try {
    katex.renderToString(latex, {
      displayMode: true,
      throwOnError: true,
    });
    return null;
  } catch (err) {
    if (err instanceof Error) {
      // KaTeX errors include the position — clean up for display
      return err.message.replace(/^KaTeX parse error: /, "");
    }
    return "Unknown parsing error";
  }
}
