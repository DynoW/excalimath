/**
 * ExcaliMath Desktop — Electrobun main process entry point.
 */

import { BrowserWindow } from "electrobun";

const mainWindow = new BrowserWindow({
  title: "ExcaliMath",
  frame: {
    x: 100,
    y: 100,
    width: 1280,
    height: 800,
  },
  url: "views://mainview/index.html",
});

console.log("[ExcaliMath Desktop] Ready");
