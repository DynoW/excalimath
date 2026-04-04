/**
 * Electrobun configuration for ExcaliMath Desktop.
 */

import type { ElectrobunConfig } from "electrobun";

const config: ElectrobunConfig = {
  app: {
    name: "ExcaliMath",
    identifier: "com.excalimath.desktop",
    version: "0.1.0",
    description: "Math whiteboard — equations, graphs, and STEM shapes",
  },

  build: {
    bun: {
      entrypoint: "src/bun/index.ts",
    },
    views: {
      mainview: {
        entrypoint: "src/views/mainview/index.tsx",
        define: {
          "process.env.IS_PREACT": JSON.stringify("false"),
        },
      },
    },
    copy: {
      "src/views/mainview/index.html": "views/mainview/index.html",
    },
    // Build for current platform
    targets: "current",

    win: {
      // Use native WebView2 (no need to bundle CEF)
      bundleCEF: false,
    },
  },
};

export default config;
