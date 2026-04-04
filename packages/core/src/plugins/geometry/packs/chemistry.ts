import type { LibraryShape } from "../types";

export const chemistryShapes: LibraryShape[] = [
  {
    name: "Atom Model (Bohr)",
    elements: [
      { type: "ellipse", x: 40, y: 40, width: 20, height: 20, strokeColor: "#e03131", backgroundColor: "#ffc9c9", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 44, y: 44, width: 12, height: 12, text: "N", fontSize: 10, fontFamily: 1, strokeColor: "#e03131", textAlign: "center" },
      { type: "ellipse", x: 10, y: 10, width: 80, height: 80, strokeColor: "#1971c2", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: -5, y: -5, width: 110, height: 110, strokeColor: "#1971c2", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 6, y: 10, width: 8, height: 8, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 86, y: 45, width: 8, height: 8, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: -5, y: 60, width: 8, height: 8, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "ellipse", x: 98, y: 75, width: 8, height: 8, strokeColor: "#1971c2", backgroundColor: "#1971c2", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
    ],
  },
  {
    name: "Periodic Table Tile",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 70, height: 80, strokeColor: "#1e1e1e", backgroundColor: "#e7f5ff", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 5, y: 3, width: 16, height: 12, text: "11", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 18, y: 18, width: 36, height: 28, text: "Na", fontSize: 28, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" },
      { type: "text", x: 8, y: 50, width: 54, height: 12, text: "Sodium", fontSize: 11, fontFamily: 1, strokeColor: "#555", textAlign: "center" },
      { type: "text", x: 12, y: 64, width: 46, height: 10, text: "22.990", fontSize: 10, fontFamily: 1, strokeColor: "#888", textAlign: "center" },
    ],
  },
  {
    name: "Single Bond",
    elements: [
      { type: "ellipse", x: 0, y: 10, width: 20, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#e9ecef", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 20, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 60, y: 10, width: 20, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#e9ecef", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Double Bond",
    elements: [
      { type: "ellipse", x: 0, y: 10, width: 20, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#e9ecef", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 17, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 23, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 60, y: 10, width: 20, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#e9ecef", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Triple Bond",
    elements: [
      { type: "ellipse", x: 0, y: 10, width: 20, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#e9ecef", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 14, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 20, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 26, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 60, y: 10, width: 20, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#e9ecef", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Beaker",
    elements: [
      { type: "line", x: 0, y: 0, width: 70, height: 100, points: [[0, 0], [0, 90], [10, 100], [60, 100], [70, 90], [70, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 5, y: 50, width: 60, height: 45, strokeColor: "transparent", backgroundColor: "#a5d8ff", fillStyle: "solid", strokeWidth: 0, roughness: 0, opacity: 60 },
      { type: "line", x: -5, y: 25, width: 10, height: 0, points: [[0, 0], [10, 0]], strokeColor: "#888", strokeWidth: 1, roughness: 0 },
      { type: "line", x: -5, y: 50, width: 10, height: 0, points: [[0, 0], [10, 0]], strokeColor: "#888", strokeWidth: 1, roughness: 0 },
      { type: "line", x: -5, y: 75, width: 10, height: 0, points: [[0, 0], [10, 0]], strokeColor: "#888", strokeWidth: 1, roughness: 0 },
    ],
  },
  {
    name: "Erlenmeyer Flask",
    elements: [
      { type: "line", x: 0, y: 0, width: 80, height: 100, points: [[25, 0], [25, 30], [0, 100], [80, 100], [55, 30], [55, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 0, y: 0, width: 80, height: 100, points: [[25, 0], [55, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 10, y: 60, width: 60, height: 36, strokeColor: "transparent", backgroundColor: "#b2f2bb", fillStyle: "solid", strokeWidth: 0, roughness: 0, opacity: 60 },
    ],
  },
  {
    name: "Test Tube",
    elements: [
      { type: "line", x: 0, y: 0, width: 20, height: 80, points: [[0, 0], [0, 70]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 0, width: 0, height: 80, points: [[0, 0], [0, 70]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 0, y: 65, width: 20, height: 15, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 2, y: 40, width: 16, height: 30, strokeColor: "transparent", backgroundColor: "#d0bfff", fillStyle: "solid", strokeWidth: 0, roughness: 0, opacity: 60 },
      { type: "line", x: -4, y: 0, width: 28, height: 0, points: [[0, 0], [28, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
];
