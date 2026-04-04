import type { LibraryShape } from "../types";

export const physicsShapes: LibraryShape[] = [
  // ══════════════════════════════════════
  // ── Basic Components ──
  // ══════════════════════════════════════

  {
    name: "Wire",
    elements: [
      { type: "line", x: 0, y: 20, width: 100, height: 0, points: [[0, 0], [100, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Cell",
    elements: [
      { type: "line", x: 0, y: 25, width: 35, height: 0, points: [[0, 0], [35, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Long line (positive)
      { type: "line", x: 35, y: 8, width: 0, height: 34, points: [[0, 0], [0, 34]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Short line (negative)
      { type: "line", x: 45, y: 15, width: 0, height: 20, points: [[0, 0], [0, 20]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 45, y: 25, width: 35, height: 0, points: [[0, 0], [35, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 31, y: -4, width: 10, height: 12, text: "+", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
      { type: "text", x: 44, y: -4, width: 10, height: 12, text: "-", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
    ],
  },
  {
    name: "Battery",
    elements: [
      { type: "line", x: 0, y: 25, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Long-short-long-short pattern
      { type: "line", x: 30, y: 8, width: 0, height: 34, points: [[0, 0], [0, 34]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 37, y: 15, width: 0, height: 20, points: [[0, 0], [0, 20]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 44, y: 8, width: 0, height: 34, points: [[0, 0], [0, 34]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 51, y: 15, width: 0, height: 20, points: [[0, 0], [0, 20]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 51, y: 25, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 25, y: -4, width: 10, height: 12, text: "+", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
      { type: "text", x: 52, y: -4, width: 10, height: 12, text: "-", fontSize: 12, fontFamily: 1, strokeColor: "#1e1e1e" },
    ],
  },
  {
    name: "Switch (Open)",
    elements: [
      { type: "line", x: 0, y: 30, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 28, y: 27, width: 6, height: 6, strokeColor: "#1e1e1e", backgroundColor: "#1e1e1e", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 31, y: 30, width: 40, height: -20, points: [[0, 0], [40, -20]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 68, y: 27, width: 6, height: 6, strokeColor: "#1e1e1e", backgroundColor: "#1e1e1e", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 74, y: 30, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Switch (Closed)",
    elements: [
      { type: "line", x: 0, y: 30, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 28, y: 27, width: 6, height: 6, strokeColor: "#1e1e1e", backgroundColor: "#1e1e1e", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 31, y: 30, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 68, y: 27, width: 6, height: 6, strokeColor: "#1e1e1e", backgroundColor: "#1e1e1e", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
      { type: "line", x: 74, y: 30, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Ground",
    elements: [
      { type: "line", x: 40, y: 0, width: 0, height: 20, points: [[0, 0], [0, 20]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 20, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 27, y: 28, width: 26, height: 0, points: [[0, 0], [26, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 34, y: 36, width: 12, height: 0, points: [[0, 0], [12, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },

  // ══════════════════════════════════════
  // ── Resistors & Passive Components ──
  // ══════════════════════════════════════

  {
    name: "Resistor",
    elements: [
      { type: "line", x: 0, y: 20, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 20, width: 60, height: 0, points: [[0, 0], [10, -15], [20, 15], [30, -15], [40, 15], [50, -15], [60, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 80, y: 20, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Resistor (IEC Box)",
    elements: [
      { type: "line", x: 0, y: 20, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 25, y: 8, width: 50, height: 24, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 75, y: 20, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Variable Resistor",
    elements: [
      { type: "line", x: 0, y: 25, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 25, y: 13, width: 50, height: 24, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 75, y: 25, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Diagonal arrow through the box
      { type: "arrow", x: 22, y: 40, width: 56, height: -32, points: [[0, 0], [56, -32]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
    ],
  },
  {
    name: "Thermistor",
    elements: [
      { type: "line", x: 0, y: 25, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 25, y: 13, width: 50, height: 24, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 75, y: 25, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Diagonal line through the box (no arrow for thermistor)
      { type: "line", x: 28, y: 34, width: 44, height: -22, points: [[0, 0], [44, -22]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Fuse",
    elements: [
      { type: "line", x: 0, y: 20, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 25, y: 10, width: 50, height: 20, strokeColor: "#1e1e1e", backgroundColor: "#1e1e1e", fillStyle: "solid", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 75, y: 20, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "LDR",
    elements: [
      { type: "line", x: 0, y: 25, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "rectangle", x: 25, y: 13, width: 50, height: 24, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 75, y: 25, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Light arrows pointing in
      { type: "arrow", x: 30, y: 5, width: 10, height: 6, points: [[0, 0], [10, 6]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "arrow", x: 38, y: 2, width: 10, height: 6, points: [[0, 0], [10, 6]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
    ],
  },
  {
    name: "Capacitor",
    elements: [
      { type: "line", x: 0, y: 25, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 40, y: 5, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 55, y: 5, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 55, y: 25, width: 40, height: 0, points: [[0, 0], [40, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Inductor",
    elements: [
      { type: "line", x: 0, y: 20, width: 15, height: 0, points: [[0, 0], [15, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 15, y: 20, width: 15, height: 0, points: [[0, 0], [3, -12], [12, -12], [15, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 30, y: 20, width: 15, height: 0, points: [[0, 0], [3, -12], [12, -12], [15, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 45, y: 20, width: 15, height: 0, points: [[0, 0], [3, -12], [12, -12], [15, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 60, y: 20, width: 15, height: 0, points: [[0, 0], [3, -12], [12, -12], [15, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 75, y: 20, width: 15, height: 0, points: [[0, 0], [15, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },

  // ══════════════════════════════════════
  // ── Semiconductor Devices ──
  // ══════════════════════════════════════

  {
    name: "Diode",
    elements: [
      { type: "line", x: 0, y: 25, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Triangle
      { type: "line", x: 30, y: 25, width: 20, height: 0, points: [[0, -15], [0, 15], [20, 0], [0, -15]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Bar
      { type: "line", x: 50, y: 10, width: 0, height: 30, points: [[0, 0], [0, 30]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 50, y: 25, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "LED",
    elements: [
      { type: "line", x: 0, y: 25, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Triangle
      { type: "line", x: 30, y: 25, width: 20, height: 0, points: [[0, -15], [0, 15], [20, 0], [0, -15]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Bar
      { type: "line", x: 50, y: 10, width: 0, height: 30, points: [[0, 0], [0, 30]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 50, y: 25, width: 30, height: 0, points: [[0, 0], [30, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Light arrows going out
      { type: "arrow", x: 44, y: 2, width: 12, height: -8, points: [[0, 0], [12, -8]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "arrow", x: 50, y: 5, width: 12, height: -8, points: [[0, 0], [12, -8]], strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
    ],
  },
  {
    name: "Transistor (NPN)",
    elements: [
      // Base lead (left)
      { type: "line", x: 0, y: 30, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Vertical bar at base
      { type: "line", x: 25, y: 10, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 3, roughness: 0 },
      // Collector line (top-right)
      { type: "line", x: 25, y: 18, width: 25, height: -18, points: [[0, 0], [25, -18]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Collector lead up
      { type: "line", x: 50, y: 0, width: 0, height: 10, points: [[0, 0], [0, 10]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Emitter line (bottom-right) with arrow
      { type: "arrow", x: 25, y: 42, width: 25, height: 18, points: [[0, 0], [25, 18]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      // Emitter lead down
      { type: "line", x: 50, y: 50, width: 0, height: 10, points: [[0, 0], [0, 10]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Circle around it
      { type: "ellipse", x: 12, y: 2, width: 48, height: 56, strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0 },
      // Labels
      { type: "text", x: -2, y: 18, width: 8, height: 10, text: "B", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 54, y: -6, width: 8, height: 10, text: "C", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 54, y: 52, width: 8, height: 10, text: "E", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
    ],
  },
  {
    name: "Transistor (PNP)",
    elements: [
      // Base lead (left)
      { type: "line", x: 0, y: 30, width: 25, height: 0, points: [[0, 0], [25, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Vertical bar at base
      { type: "line", x: 25, y: 10, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 3, roughness: 0 },
      // Collector line (top-right)
      { type: "line", x: 25, y: 18, width: 25, height: -18, points: [[0, 0], [25, -18]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Collector lead up
      { type: "line", x: 50, y: 0, width: 0, height: 10, points: [[0, 0], [0, 10]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Emitter line (bottom-right) with arrow pointing IN (toward base)
      { type: "arrow", x: 50, y: 60, width: -25, height: -18, points: [[0, 0], [-25, -18]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      // Emitter lead down
      { type: "line", x: 50, y: 50, width: 0, height: 10, points: [[0, 0], [0, 10]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Circle around it
      { type: "ellipse", x: 12, y: 2, width: 48, height: 56, strokeColor: "#1e1e1e", strokeWidth: 1, roughness: 0 },
      // Labels
      { type: "text", x: -2, y: 18, width: 8, height: 10, text: "B", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 54, y: -6, width: 8, height: 10, text: "C", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
      { type: "text", x: 54, y: 52, width: 8, height: 10, text: "E", fontSize: 10, fontFamily: 1, strokeColor: "#888" },
    ],
  },

  // ══════════════════════════════════════
  // ── Meters & Output Devices ──
  // ══════════════════════════════════════

  {
    name: "Ammeter",
    elements: [
      { type: "line", x: 0, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 20, y: 5, width: 40, height: 40, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 32, y: 14, width: 16, height: 20, text: "A", fontSize: 20, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" },
      { type: "line", x: 60, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Voltmeter",
    elements: [
      { type: "line", x: 0, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 20, y: 5, width: 40, height: 40, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 32, y: 14, width: 16, height: 20, text: "V", fontSize: 20, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" },
      { type: "line", x: 60, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Motor",
    elements: [
      { type: "line", x: 0, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 20, y: 5, width: 40, height: 40, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 31, y: 14, width: 16, height: 20, text: "M", fontSize: 20, fontFamily: 1, strokeColor: "#1e1e1e", textAlign: "center" },
      { type: "line", x: 60, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Lamp",
    elements: [
      { type: "line", x: 0, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "ellipse", x: 20, y: 5, width: 40, height: 40, strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // X cross inside
      { type: "line", x: 27, y: 12, width: 26, height: 26, points: [[0, 0], [26, 26]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 27, y: 38, width: 26, height: -26, points: [[0, 0], [26, -26]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 60, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },
  {
    name: "Buzzer",
    elements: [
      { type: "line", x: 0, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      // Buzzer body (D shape)
      { type: "line", x: 20, y: 5, width: 0, height: 40, points: [[0, 0], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 20, y: 5, width: 25, height: 40, points: [[0, 0], [15, 0], [25, 10], [25, 30], [15, 40], [0, 40]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "line", x: 45, y: 25, width: 20, height: 0, points: [[0, 0], [20, 0]], strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
    ],
  },

  // ══════════════════════════════════════
  // ── Logic Gates (SVG with smooth curves) ──
  // ══════════════════════════════════════

  // AND: flat left, curved right
  { name: "AND Gate", elements: [], svgWidth: 90, svgHeight: 50,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="50" fill="none" stroke="#1e1e1e" stroke-width="2"><line x1="0" y1="15" x2="20" y2="15"/><line x1="0" y1="35" x2="20" y2="35"/><path d="M20,0 L20,50 L45,50 C65,50 70,25 70,25 C70,25 65,0 45,0 Z"/><line x1="70" y1="25" x2="90" y2="25"/></svg>` },

  // OR: curved left, pointed right
  { name: "OR Gate", elements: [], svgWidth: 90, svgHeight: 50,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="50" fill="none" stroke="#1e1e1e" stroke-width="2"><line x1="0" y1="15" x2="24" y2="15"/><line x1="0" y1="35" x2="24" y2="35"/><path d="M15,0 Q30,25 15,50"/><path d="M15,0 C25,0 50,0 70,25 C50,50 25,50 15,50"/><line x1="70" y1="25" x2="90" y2="25"/></svg>` },

  // NOT: triangle + bubble
  { name: "NOT Gate", elements: [], svgWidth: 90, svgHeight: 50,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="50" fill="none" stroke="#1e1e1e" stroke-width="2"><line x1="0" y1="25" x2="20" y2="25"/><polygon points="20,0 20,50 60,25"/><circle cx="65" cy="25" r="5"/><line x1="70" y1="25" x2="90" y2="25"/></svg>` },

  // NAND: AND + bubble
  { name: "NAND Gate", elements: [], svgWidth: 98, svgHeight: 50,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="98" height="50" fill="none" stroke="#1e1e1e" stroke-width="2"><line x1="0" y1="15" x2="20" y2="15"/><line x1="0" y1="35" x2="20" y2="35"/><path d="M20,0 L20,50 L45,50 C65,50 70,25 70,25 C70,25 65,0 45,0 Z"/><circle cx="75" cy="25" r="5"/><line x1="80" y1="25" x2="98" y2="25"/></svg>` },

  // NOR: OR + bubble
  { name: "NOR Gate", elements: [], svgWidth: 98, svgHeight: 50,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="98" height="50" fill="none" stroke="#1e1e1e" stroke-width="2"><line x1="0" y1="15" x2="24" y2="15"/><line x1="0" y1="35" x2="24" y2="35"/><path d="M15,0 Q30,25 15,50"/><path d="M15,0 C25,0 50,0 70,25 C50,50 25,50 15,50"/><circle cx="75" cy="25" r="5"/><line x1="80" y1="25" x2="98" y2="25"/></svg>` },

  // XOR: OR + extra curved line on left
  { name: "XOR Gate", elements: [], svgWidth: 90, svgHeight: 50,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="50" fill="none" stroke="#1e1e1e" stroke-width="2"><line x1="0" y1="15" x2="24" y2="15"/><line x1="0" y1="35" x2="24" y2="35"/><path d="M10,0 Q25,25 10,50"/><path d="M15,0 Q30,25 15,50"/><path d="M15,0 C25,0 50,0 70,25 C50,50 25,50 15,50"/><line x1="70" y1="25" x2="90" y2="25"/></svg>` },

  // XNOR: XOR + bubble
  { name: "XNOR Gate", elements: [], svgWidth: 98, svgHeight: 50,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="98" height="50" fill="none" stroke="#1e1e1e" stroke-width="2"><line x1="0" y1="15" x2="24" y2="15"/><line x1="0" y1="35" x2="24" y2="35"/><path d="M10,0 Q25,25 10,50"/><path d="M15,0 Q30,25 15,50"/><path d="M15,0 C25,0 50,0 70,25 C50,50 25,50 15,50"/><circle cx="75" cy="25" r="5"/><line x1="80" y1="25" x2="98" y2="25"/></svg>` },

  // Buffer: triangle (no bubble)
  { name: "Buffer", elements: [], svgWidth: 80, svgHeight: 50,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" fill="none" stroke="#1e1e1e" stroke-width="2"><line x1="0" y1="25" x2="20" y2="25"/><polygon points="20,0 20,50 60,25"/><line x1="60" y1="25" x2="80" y2="25"/></svg>` },

  // ══════════════════════════════════════
  // ── Force Arrows ──
  // ══════════════════════════════════════

  {
    name: "Force Arrow",
    elements: [
      { type: "arrow", x: 0, y: 20, width: 100, height: 0, points: [[0, 0], [100, 0]], strokeColor: "#e03131", strokeWidth: 3, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "text", x: 35, y: 2, width: 12, height: 16, text: "F", fontSize: 16, fontFamily: 1, strokeColor: "#e03131" },
    ],
  },
  {
    name: "Force Arrows (Balanced)",
    elements: [
      { type: "arrow", x: 60, y: 30, width: 80, height: 0, points: [[0, 0], [80, 0]], strokeColor: "#e03131", strokeWidth: 3, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "arrow", x: 60, y: 30, width: -80, height: 0, points: [[0, 0], [-80, 0]], strokeColor: "#1971c2", strokeWidth: 3, roughness: 0, endArrowhead: "arrow", startArrowhead: null },
      { type: "ellipse", x: 55, y: 25, width: 10, height: 10, strokeColor: "#1e1e1e", backgroundColor: "#1e1e1e", fillStyle: "solid", strokeWidth: 1, roughness: 0 },
    ],
  },
];
