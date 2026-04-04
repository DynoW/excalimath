export interface ExpressionEntry {
  label: string;
  latex: string;
  category: string;
}

export const expressionLibrary: ExpressionEntry[] = [
  // ── Fractions ──
  { label: "Simple fraction", latex: "\\frac{a}{b}", category: "Fractions" },
  { label: "Mixed number", latex: "2\\frac{3}{4}", category: "Fractions" },
  { label: "Nested fraction", latex: "\\frac{\\frac{a}{b}}{\\frac{c}{d}}", category: "Fractions" },
  { label: "Continued fraction", latex: "a + \\cfrac{1}{b + \\cfrac{1}{c}}", category: "Fractions" },

  // ── Powers & Roots ──
  { label: "Square root", latex: "\\sqrt{x}", category: "Powers & Roots" },
  { label: "nth root", latex: "\\sqrt[n]{x}", category: "Powers & Roots" },
  { label: "Exponent", latex: "x^{n}", category: "Powers & Roots" },
  { label: "Quadratic formula", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", category: "Powers & Roots" },

  // ── Algebra ──
  { label: "Equation", latex: "ax + b = c", category: "Algebra" },
  { label: "System of equations", latex: "\\begin{cases} x + y = 5 \\\\ 2x - y = 1 \\end{cases}", category: "Algebra" },
  { label: "Inequality", latex: "x^2 - 4 \\geq 0", category: "Algebra" },
  { label: "Absolute value", latex: "|x - a| < \\epsilon", category: "Algebra" },
  { label: "Binomial expansion", latex: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k", category: "Algebra" },

  // ── Trigonometry ──
  { label: "Sine", latex: "\\sin(\\theta)", category: "Trigonometry" },
  { label: "Cosine", latex: "\\cos(\\theta)", category: "Trigonometry" },
  { label: "Tangent", latex: "\\tan(\\theta)", category: "Trigonometry" },
  { label: "Pythagorean identity", latex: "\\sin^2\\theta + \\cos^2\\theta = 1", category: "Trigonometry" },
  { label: "Law of cosines", latex: "c^2 = a^2 + b^2 - 2ab\\cos(C)", category: "Trigonometry" },

  // ── Calculus — Limits ──
  { label: "Limit", latex: "\\lim_{x \\to a} f(x)", category: "Calculus" },
  { label: "Limit at infinity", latex: "\\lim_{x \\to \\infty} \\frac{1}{x} = 0", category: "Calculus" },

  // ── Calculus — Derivatives ──
  { label: "Derivative", latex: "\\frac{df}{dx}", category: "Calculus" },
  { label: "Second derivative", latex: "\\frac{d^2f}{dx^2}", category: "Calculus" },
  { label: "Partial derivative", latex: "\\frac{\\partial f}{\\partial x}", category: "Calculus" },
  { label: "Chain rule", latex: "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}", category: "Calculus" },

  // ── Calculus — Integrals ──
  { label: "Indefinite integral", latex: "\\int f(x)\\,dx", category: "Calculus" },
  { label: "Definite integral", latex: "\\int_{a}^{b} f(x)\\,dx", category: "Calculus" },
  { label: "Double integral", latex: "\\iint_D f(x,y)\\,dA", category: "Calculus" },

  // ── Summation & Series ──
  { label: "Summation", latex: "\\sum_{i=1}^{n} a_i", category: "Summation" },
  { label: "Product", latex: "\\prod_{i=1}^{n} a_i", category: "Summation" },
  { label: "Geometric series", latex: "\\sum_{k=0}^{\\infty} ar^k = \\frac{a}{1-r}", category: "Summation" },

  // ── Matrices ──
  { label: "2x2 Matrix", latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}", category: "Matrices" },
  { label: "3x3 Matrix", latex: "\\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}", category: "Matrices" },
  { label: "Determinant", latex: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc", category: "Matrices" },

  // ── Greek Letters ──
  { label: "Alpha, Beta, Gamma", latex: "\\alpha, \\beta, \\gamma", category: "Greek Letters" },
  { label: "Pi", latex: "\\pi \\approx 3.14159", category: "Greek Letters" },
  { label: "Sigma, Delta", latex: "\\Sigma, \\Delta, \\Omega", category: "Greek Letters" },

  // ── Geometry ──
  { label: "Angle", latex: "\\angle ABC = 90°", category: "Geometry" },
  { label: "Triangle area", latex: "A = \\frac{1}{2}bh", category: "Geometry" },
  { label: "Circle area", latex: "A = \\pi r^2", category: "Geometry" },
  { label: "Pythagorean theorem", latex: "a^2 + b^2 = c^2", category: "Geometry" },
];

/** Get all unique categories from the expression library */
export function getCategories(): string[] {
  return [...new Set(expressionLibrary.map((e) => e.category))];
}

/** Filter expressions by category and/or search term */
export function filterExpressions(
  category?: string,
  search?: string
): ExpressionEntry[] {
  let results = expressionLibrary;

  if (category) {
    results = results.filter((e) => e.category === category);
  }

  if (search) {
    const lower = search.toLowerCase();
    results = results.filter(
      (e) =>
        e.label.toLowerCase().includes(lower) ||
        e.latex.toLowerCase().includes(lower) ||
        e.category.toLowerCase().includes(lower)
    );
  }

  return results;
}
