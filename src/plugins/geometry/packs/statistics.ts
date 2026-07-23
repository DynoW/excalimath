import type { LibraryShape } from "../types";

export const statisticsShapes: LibraryShape[] = [
  {
    name: "Bar Chart Frame",
    elements: [
      { type: "arrow", x: 30, y: 0, width: 0, height: 120, points: [[0, 0], [0, 120]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, startArrowhead: "arrow", endArrowhead: null },
      { type: "arrow", x: 30, y: 120, width: 180, height: 0, points: [[0, 0], [180, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "rectangle", x: 45, y: 40, width: 25, height: 80, strokeColor: "#1971c2", backgroundColor: "#a5d8ff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 80, y: 60, width: 25, height: 60, strokeColor: "#e03131", backgroundColor: "#ffc9c9", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 115, y: 20, width: 25, height: 100, strokeColor: "#2f9e44", backgroundColor: "#b2f2bb", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 150, y: 50, width: 25, height: 70, strokeColor: "#e8590c", backgroundColor: "#ffd8a8", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
    ],
  },
  {
    name: "Pie Chart (4 segments)",
    elements: [
      { type: "ellipse", x: 0, y: 0, width: 120, height: 120, strokeColor: "#1e1e1e", backgroundColor: "#a5d8ff", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 60, y: 0, width: 0, height: 60, points: [[0, 0], [0, 60]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 60, y: 60, width: 60, height: 0, points: [[0, 0], [60, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 60, y: 60, width: 0, height: 60, points: [[0, 0], [0, 60]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 0, y: 60, width: 60, height: 0, points: [[0, 0], [60, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 70, y: 22, width: 24, height: 14, text: "25%", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
      { type: "text", x: 70, y: 70, width: 24, height: 14, text: "25%", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
      { type: "text", x: 22, y: 70, width: 24, height: 14, text: "25%", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
      { type: "text", x: 22, y: 22, width: 24, height: 14, text: "25%", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
    ],
  },
  {
    name: "Histogram Frame",
    elements: [
      { type: "arrow", x: 30, y: 0, width: 0, height: 120, points: [[0, 0], [0, 120]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, startArrowhead: "arrow", endArrowhead: null },
      { type: "arrow", x: 30, y: 120, width: 180, height: 0, points: [[0, 0], [180, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "rectangle", x: 35, y: 60, width: 30, height: 60, strokeColor: "#6965db", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 65, y: 30, width: 30, height: 90, strokeColor: "#6965db", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 95, y: 10, width: 30, height: 110, strokeColor: "#6965db", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 125, y: 40, width: 30, height: 80, strokeColor: "#6965db", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 155, y: 70, width: 30, height: 50, strokeColor: "#6965db", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 80, y: 128, width: 60, height: 14, text: "Frequency", fontSize: 11, fontFamily: 1, strokeColor: "#888", textAlign: "center" },
    ],
  },
  {
    name: "Scatter Plot Axes",
    elements: [
      { type: "arrow", x: 30, y: 0, width: 0, height: 150, points: [[0, 0], [0, 150]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, startArrowhead: "arrow", endArrowhead: null },
      { type: "arrow", x: 30, y: 150, width: 180, height: 0, points: [[0, 0], [180, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "ellipse", x: 55, y: 100, width: 6, height: 6, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 80, y: 80, width: 6, height: 6, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 100, y: 60, width: 6, height: 6, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 130, y: 45, width: 6, height: 6, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 160, y: 25, width: 6, height: 6, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 70, y: 110, width: 6, height: 6, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 120, y: 70, width: 6, height: 6, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 150, y: 40, width: 6, height: 6, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
    ],
  },
  {
    name: "Box Plot Frame",
    elements: [
      { type: "line", x: 30, y: 40, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 30, y: 60, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0 },
      { type: "rectangle", x: 60, y: 30, width: 60, height: 60, strokeColor: "#1e1e1e", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 90, y: 30, width: 0, height: 60, points: [[0, 0], [0, 60]], strokeColor: "#e03131", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 120, y: 60, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 150, y: 40, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 20, y: 85, width: 24, height: 12, text: "Min", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 55, y: 85, width: 16, height: 12, text: "Q1", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 78, y: 85, width: 24, height: 12, text: "Med", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 110, y: 85, width: 16, height: 12, text: "Q3", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 140, y: 85, width: 24, height: 12, text: "Max", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
    ],
  },
];
