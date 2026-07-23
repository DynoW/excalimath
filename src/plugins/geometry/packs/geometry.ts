import type { LibraryShape } from "../types";

export const geometryShapes: LibraryShape[] = [
  {
    name: "Right Triangle",
    elements: [
      { type: "line", x: 0, y: 0, width: 100, height: 80, points: [[0, 80], [100, 80], [0, 0], [0, 80]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 0, y: 65, width: 15, height: 15, strokeColor: "#1e1e1e", backgroundColor: "transparent", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
    ],
  },
  {
    name: "Equilateral Triangle",
    elements: [
      { type: "line", x: 0, y: 0, width: 100, height: 87, points: [[50, 0], [100, 87], [0, 87], [50, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Isosceles Triangle",
    elements: [
      { type: "line", x: 0, y: 0, width: 100, height: 80, points: [[50, 0], [100, 80], [0, 80], [50, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Circle",
    elements: [
      { type: "ellipse", x: 0, y: 0, width: 100, height: 100, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Circle with Radius",
    elements: [
      { type: "ellipse", x: 0, y: 0, width: 100, height: 100, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 50, y: 50, width: 50, height: 0, points: [[0, 0], [50, 0]], strokeColor: "#e03131", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 55, y: 32, width: 10, height: 14, text: "r", fontSize: 14, fontFamily: 1, strokeColor: "#e03131" },
    ],
  },
  {
    name: "Square",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 80, height: 80, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Rectangle",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 120, height: 80, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Pentagon",
    elements: [
      { type: "line", x: 0, y: 0, width: 100, height: 95, points: [[50, 0], [100, 35], [81, 95], [19, 95], [0, 35], [50, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Hexagon",
    elements: [
      { type: "line", x: 0, y: 0, width: 100, height: 87, points: [[25, 0], [75, 0], [100, 43], [75, 87], [25, 87], [0, 43], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Parallelogram",
    elements: [
      { type: "line", x: 0, y: 0, width: 140, height: 70, points: [[30, 0], [140, 0], [110, 70], [0, 70], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Trapezoid",
    elements: [
      { type: "line", x: 0, y: 0, width: 140, height: 70, points: [[30, 0], [110, 0], [140, 70], [0, 70], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Angle (30°)",
    elements: [
      { type: "line", x: 0, y: 0, width: 100, height: 60, points: [[0, 60], [100, 60]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 0, y: 0, width: 100, height: 60, points: [[0, 60], [87, 10]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 25, y: 42, width: 24, height: 14, text: "30°", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
    ],
  },
  {
    name: "Right Angle",
    elements: [
      { type: "line", x: 0, y: 0, width: 100, height: 80, points: [[0, 0], [0, 80]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 0, y: 0, width: 100, height: 80, points: [[0, 80], [100, 80]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 0, y: 65, width: 15, height: 15, strokeColor: "#1e1e1e", backgroundColor: "transparent", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 18, y: 60, width: 24, height: 14, text: "90°", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
    ],
  },
  {
    name: "Coordinate Grid",
    elements: [
      { type: "arrow", x: 0, y: 100, width: 200, height: 0, points: [[0, 0], [200, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: "arrow" },
      { type: "arrow", x: 100, y: 0, width: 0, height: 200, points: [[0, 0], [0, 200]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: "arrow" },
      { type: "text", x: 195, y: 103, width: 10, height: 14, text: "x", fontSize: 14, fontFamily: 1, strokeColor: "#1e1e1e" },
      { type: "text", x: 103, y: -2, width: 10, height: 14, text: "y", fontSize: 14, fontFamily: 1, strokeColor: "#1e1e1e" },
    ],
  },
  {
    name: "Number Line",
    elements: [
      { type: "arrow", x: 0, y: 20, width: 240, height: 0, points: [[0, 0], [240, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: "arrow" },
      ...Array.from({ length: 11 }, (_, i) => ({
        type: "line" as const, x: i * 22 + 10, y: 15, width: 0, height: 10, points: [[0, 0], [0, 10]] as [number, number][], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0,
      })),
    ],
  },
  {
    name: "Protractor",
    elements: [
      { type: "line", x: 0, y: 60, width: 120, height: 0, points: [[0, 0], [120, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 0, y: 0, width: 120, height: 120, strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0 },
      { type: "text", x: 52, y: 62, width: 20, height: 14, text: "0°", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 115, y: 52, width: 24, height: 14, text: "90°", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 48, y: -4, width: 28, height: 14, text: "180°", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
    ],
  },
];
