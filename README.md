# @excalimath/core

Math companion plugin for [Excalidraw](https://excalidraw.com) — KaTeX equations, Plotly.js function graphs, and 80+ STEM shapes. Wraps the `@excalidraw/excalidraw` React component without forking it.

[![npm version](https://img.shields.io/npm/v/@excalimath/core)](https://www.npmjs.com/package/@excalimath/core)
[![license](https://img.shields.io/npm/l/@excalimath/core)](./LICENSE)

## Install

```bash
npm install @excalimath/core
```

## Peer Dependencies

Your project must already provide:

- `react` >= 18
- `react-dom` >= 18
- `@excalidraw/excalidraw` >= 0.17

## Usage

```tsx
import { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcaliMath } from "@excalimath/core";

export default function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Excalidraw
        excalidrawAPI={setExcalidrawAPI}
        renderTopRightUI={() =>
          excalidrawAPI ? <ExcaliMath excalidrawAPI={excalidrawAPI} /> : null
        }
      />
    </div>
  );
}
```

## Features

### Equations (KaTeX)
- Visual toolbar — insert fractions, integrals, Greek letters, matrices
- Live preview as you type
- Click any canvas equation to re-edit
- 40+ pre-built expressions across 9 categories

### Graphs (Plotly.js)
- Plot `sin(x)`, `x^2 + 2*x`, and more with safe evaluation via mathjs
- Up to 5 colour-coded functions per graph
- Configurable axes, labels, grid, and tick intervals

### Shape Libraries
- 80+ STEM shapes across 6 subject packs (algebra, biology, chemistry, geometry, physics, statistics)
- Curriculum-aligned, drag-and-drop

## ExcaliMath Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `excalidrawAPI` | `ExcalidrawAPI` | required | Excalidraw API instance |
| `onSave` | `(data) => void` | — | Called when canvas state changes |
| `initialData` | `InitialData` | — | Restore elements, app state, and files |
| `theme` | `"light" \| "dark"` | `"light"` | Force theme, or omit for auto-detect |

## Development

```bash
git clone https://github.com/DynoW/excalimath.git
cd excalimath
npm install
npm run dev          # watch mode
npm run build        # production build
npm run typecheck    # type-check only
```

## Related

- [ExcaliMath Demo](https://excalimath.my-lab.ro) — live demo app
- [ExcaliMath for VS Code](https://marketplace.visualstudio.com/items?itemName=DynoW.excalimath-vscode) — VS Code extension

## License

MIT — originally created by [Tamer — ITWorx EdTech](https://github.com/tamerUAE).
