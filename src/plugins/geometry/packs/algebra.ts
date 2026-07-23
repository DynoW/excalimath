import type { LibraryShape } from "../types";

export const algebraShapes: LibraryShape[] = [
  {
    name: "Fraction Bar",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 60, height: 30, strokeColor: "#1e1e1e", backgroundColor: "#a5d8ff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 0, y: 30, width: 60, height: 0, points: [[0, 0], [60, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 0, y: 30, width: 60, height: 30, strokeColor: "#1e1e1e", backgroundColor: "#ffd8a8", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
    ],
  },
  {
    name: "Algebra Tile (x)",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 80, height: 30, strokeColor: "#1e1e1e", backgroundColor: "#b2f2bb", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 32, y: 6, width: 16, height: 18, text: "x", fontSize: 18, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" },
    ],
  },
  {
    name: "Algebra Tile (1)",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 30, height: 30, strokeColor: "#1e1e1e", backgroundColor: "#ffc9c9", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 9, y: 6, width: 12, height: 18, text: "1", fontSize: 18, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" },
    ],
  },
  {
    name: "Algebra Tile (x²)",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 80, height: 80, strokeColor: "#1e1e1e", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 28, y: 28, width: 24, height: 18, text: "x\u00B2", fontSize: 18, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" },
    ],
  },
  {
    name: "Balance Scale",
    elements: [
      { type: "line", x: 60, y: 120, width: 0, height: 80, points: [[0, 0], [0, 80]], strokeColor: "#1e1e1e", strokeWidth: 3, roughness: 0 },
      { type: "line", x: 30, y: 200, width: 60, height: 0, points: [[0, 0], [60, 0]], strokeColor: "#1e1e1e", strokeWidth: 3, roughness: 0 },
      { type: "line", x: 0, y: 120, width: 120, height: 0, points: [[0, 0], [120, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 0, y: 110, width: 0, height: 20, points: [[0, 0], [0, 20]], strokeColor: "#888", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 120, y: 110, width: 0, height: 20, points: [[0, 0], [0, 20]], strokeColor: "#888", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: -20, y: 130, width: 40, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#a5d8ff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 100, y: 130, width: 40, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#ffd8a8", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
    ],
  },
  {
    name: "Venn Diagram (2 sets)",
    elements: [
      { type: "ellipse", x: 0, y: 0, width: 120, height: 100, strokeColor: "#1971c2", backgroundColor: "transparent", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 60, y: 0, width: 120, height: 100, strokeColor: "#e03131", backgroundColor: "transparent", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 30, y: 40, width: 12, height: 16, text: "A", fontSize: 16, fontFamily: 1, strokeColor: "#1971c2" },
      { type: "text", x: 140, y: 40, width: 12, height: 16, text: "B", fontSize: 16, fontFamily: 1, strokeColor: "#e03131" },
    ],
  },
  {
    name: "Venn Diagram (3 sets)",
    elements: [
      { type: "ellipse", x: 20, y: 0, width: 100, height: 80, strokeColor: "#1971c2", backgroundColor: "transparent", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 60, y: 0, width: 100, height: 80, strokeColor: "#e03131", backgroundColor: "transparent", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 40, y: 30, width: 100, height: 80, strokeColor: "#2f9e44", backgroundColor: "transparent", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 35, y: 25, width: 12, height: 16, text: "A", fontSize: 14, fontFamily: 1, strokeColor: "#1971c2" },
      { type: "text", x: 130, y: 25, width: 12, height: 16, text: "B", fontSize: 14, fontFamily: 1, strokeColor: "#e03131" },
      { type: "text", x: 80, y: 90, width: 12, height: 16, text: "C", fontSize: 14, fontFamily: 1, strokeColor: "#2f9e44" },
    ],
  },
  {
    name: "Function Machine",
    elements: [
      { type: "rectangle", x: 20, y: 30, width: 80, height: 60, strokeColor: "#1e1e1e", backgroundColor: "#e9ecef", fillStyle: "solid", strokeWidth: 2, roughness: 0, roundness: { type: 3 } },
      { type: "text", x: 38, y: 50, width: 40, height: 16, text: "f(x)", fontSize: 16, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" },
      { type: "arrow", x: -30, y: 60, width: 50, height: 0, points: [[0, 0], [50, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "arrow", x: 100, y: 60, width: 50, height: 0, points: [[0, 0], [50, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "text", x: -40, y: 42, width: 30, height: 14, text: "Input", fontSize: 11, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 115, y: 42, width: 40, height: 14, text: "Output", fontSize: 11, fontFamily: 1, strokeColor: "#888" },
    ],
  },
  {
    name: "Number Cards (0-9)",
    elements: Array.from({ length: 10 }, (_, i) => ([
      { type: "rectangle" as const, x: i * 35, y: 0, width: 30, height: 40, strokeColor: "#1e1e1e", backgroundColor: "#fff9db", fillStyle: "solid" as const, strokeWidth: 1, roughness: 0, roundness: { type: 3 } },
      { type: "text" as const, x: i * 35 + 8, y: 8, width: 14, height: 20, text: String(i), fontSize: 20, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" as const },
    ])).flat(),
  },
];
