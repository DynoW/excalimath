import type { LibraryShape } from "../types";

export const biologyShapes: LibraryShape[] = [
  {
    name: "Animal Cell",
    elements: [
      { type: "ellipse", x: 0, y: 0, width: 180, height: 140, strokeColor: "#e8590c", backgroundColor: "#fff4e6", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 60, y: 40, width: 50, height: 50, strokeColor: "#862e9c", backgroundColor: "#f3d9fa", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 72, y: 55, width: 20, height: 18, strokeColor: "#862e9c", backgroundColor: "#862e9c", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 65, y: 95, width: 42, height: 12, text: "Nucleus", fontSize: 10, fontFamily: 1, strokeColor: "#862e9c" },
      { type: "ellipse", x: 130, y: 50, width: 30, height: 15, strokeColor: "#2f9e44", backgroundColor: "#d8f5a2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 122, y: 68, width: 50, height: 12, text: "Mitochondria", fontSize: 8, fontFamily: 1, strokeColor: "#2f9e44" },
      { type: "ellipse", x: 15, y: 30, width: 30, height: 20, strokeColor: "#1971c2", backgroundColor: "#d0ebff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 12, y: 52, width: 36, height: 12, text: "ER", fontSize: 10, fontFamily: 1, strokeColor: "#1971c2" },
    ],
  },
  {
    name: "Plant Cell",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 180, height: 140, strokeColor: "#2f9e44", backgroundColor: "#ebfbee", fillStyle: "solid", strokeWidth: 3, roughness: 0 },
      { type: "rectangle", x: 5, y: 5, width: 170, height: 130, strokeColor: "#2f9e44", backgroundColor: "#d8f5a2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 55, y: 35, width: 50, height: 50, strokeColor: "#862e9c", backgroundColor: "#f3d9fa", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 62, y: 90, width: 42, height: 12, text: "Nucleus", fontSize: 10, fontFamily: 1, strokeColor: "#862e9c" },
      { type: "ellipse", x: 120, y: 20, width: 40, height: 30, strokeColor: "#087f5b", backgroundColor: "#96f2d7", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 116, y: 52, width: 50, height: 12, text: "Chloroplast", fontSize: 8, fontFamily: 1, strokeColor: "#087f5b" },
      { type: "rectangle", x: 15, y: 100, width: 50, height: 25, strokeColor: "#1971c2", backgroundColor: "#d0ebff", fillStyle: "solid", strokeWidth: 1, roughness: 0, roundness: { type: 3 } },
      { type: "text", x: 18, y: 105, width: 44, height: 12, text: "Vacuole", fontSize: 10, fontFamily: 1, strokeColor: "#1971c2" },
      { type: "text", x: 55, y: -15, width: 60, height: 12, text: "Cell Wall", fontSize: 10, fontFamily: 1, strokeColor: "#2f9e44" },
    ],
  },
  {
    name: "DNA Helix Segment",
    elements: [
      { type: "line", x: 20, y: 0, width: 0, height: 120, points: [[0, 0], [-15, 20], [15, 40], [-15, 60], [15, 80], [-15, 100], [0, 120]], strokeColor: "#1971c2", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 60, y: 0, width: 0, height: 120, points: [[0, 0], [15, 20], [-15, 40], [15, 60], [-15, 80], [15, 100], [0, 120]], strokeColor: "#e03131", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 5, y: 20, width: 70, height: 0, points: [[0, 0], [70, 0]], strokeColor: "#888", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 5, y: 60, width: 70, height: 0, points: [[0, 0], [70, 0]], strokeColor: "#888", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 5, y: 100, width: 70, height: 0, points: [[0, 0], [70, 0]], strokeColor: "#888", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 25, y: 125, width: 30, height: 14, text: "DNA", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
    ],
  },
  {
    name: "Food Web Arrow",
    elements: [
      { type: "ellipse", x: 0, y: 0, width: 60, height: 30, strokeColor: "#2f9e44", backgroundColor: "#d8f5a2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 6, y: 6, width: 50, height: 14, text: "Producer", fontSize: 10, fontFamily: 1, strokeColor: "#2f9e44", textAlign: "center" },
      { type: "arrow", x: 60, y: 15, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "ellipse", x: 90, y: 0, width: 70, height: 30, strokeColor: "#e8590c", backgroundColor: "#fff4e6", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 96, y: 6, width: 58, height: 14, text: "Consumer", fontSize: 10, fontFamily: 1, strokeColor: "#e8590c", textAlign: "center" },
    ],
  },
  {
    name: "Ecosystem Icons (Sun + Water + Soil)",
    elements: [
      { type: "ellipse", x: 10, y: 0, width: 30, height: 30, strokeColor: "#e8590c", backgroundColor: "#fff3bf", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 14, y: 32, width: 22, height: 12, text: "Sun", fontSize: 10, fontFamily: 1, strokeColor: "#e8590c" },
      { type: "ellipse", x: 60, y: 5, width: 25, height: 20, strokeColor: "#1971c2", backgroundColor: "#d0ebff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 58, y: 28, width: 30, height: 12, text: "Water", fontSize: 10, fontFamily: 1, strokeColor: "#1971c2" },
      { type: "rectangle", x: 105, y: 10, width: 30, height: 18, strokeColor: "#862e9c", backgroundColor: "#e9ecef", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 108, y: 30, width: 24, height: 12, text: "Soil", fontSize: 10, fontFamily: 1, strokeColor: "#862e9c" },
    ],
  },
  {
    name: "Mitosis Stages",
    elements: [
      { type: "ellipse", x: 0, y: 10, width: 40, height: 40, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 12, y: 22, width: 16, height: 16, strokeColor: "#862e9c", backgroundColor: "#f3d9fa", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 4, y: 53, width: 36, height: 10, text: "Interphase", fontSize: 8, fontFamily: 1, strokeColor: "#888" },
      { type: "arrow", x: 42, y: 30, width: 15, height: 0, points: [[0, 0], [15, 0]], strokeColor: "#888", strokeWidth: 1, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "ellipse", x: 60, y: 10, width: 40, height: 40, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 70, y: 20, width: 20, height: 20, points: [[0, 0], [20, 20]], strokeColor: "#862e9c", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 70, y: 40, width: 20, height: -20, points: [[0, 0], [20, -20]], strokeColor: "#862e9c", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 64, y: 53, width: 36, height: 10, text: "Metaphase", fontSize: 8, fontFamily: 1, strokeColor: "#888" },
      { type: "arrow", x: 102, y: 30, width: 15, height: 0, points: [[0, 0], [15, 0]], strokeColor: "#888", strokeWidth: 1, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "ellipse", x: 120, y: 5, width: 50, height: 50, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 145, y: 10, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 126, y: 58, width: 36, height: 10, text: "Telophase", fontSize: 8, fontFamily: 1, strokeColor: "#888" },
    ],
  },
];
