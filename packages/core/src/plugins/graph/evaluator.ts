/**
 * @module graph/evaluator
 *
 * Safely evaluates mathematical function expressions using mathjs.
 * All parsing goes through mathjs — eval() is never used.
 */

import { evaluate, parse } from "mathjs";

/**
 * Safely evaluate a math expression for a range of x values using mathjs.
 * Never uses eval() — all parsing goes through mathjs.
 */
export function evaluateFunction(
  expression: string,
  xMin: number,
  xMax: number,
  numPoints = 200
): { x: number[]; y: number[] } {
  const step = (xMax - xMin) / numPoints;
  const xValues: number[] = [];
  const yValues: number[] = [];

  // Validate the expression parses before evaluating
  parse(expression);

  for (let i = 0; i <= numPoints; i++) {
    const x = xMin + i * step;
    try {
      const y = evaluate(expression, { x }) as number;
      if (typeof y === "number" && isFinite(y)) {
        xValues.push(x);
        yValues.push(y);
      } else {
        // Insert NaN to break the line at discontinuities
        xValues.push(x);
        yValues.push(NaN);
      }
    } catch {
      xValues.push(x);
      yValues.push(NaN);
    }
  }

  return { x: xValues, y: yValues };
}

/**
 * Validate a math expression string.
 * Returns null if valid, or an error message if invalid.
 */
export function validateExpression(expression: string): string | null {
  if (!expression.trim()) return null;
  try {
    parse(expression);
    // Try evaluating at x=0 to catch runtime errors
    evaluate(expression, { x: 0 });
    return null;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return "Invalid expression";
  }
}
