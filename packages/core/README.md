# @excalimath/core

Math companion plugin for Excalidraw: equations (KaTeX), function graphs, and STEM shape libraries.

## Install

```bash
npm install @excalimath/core
```

## Peer Dependencies

This package expects the host app to provide these peers:

- `react` (>=18)
- `react-dom` (>=18)
- `@excalidraw/excalidraw` (>=0.17)

## Why These Runtime Dependencies Exist

`@excalimath/core` uses these packages directly at runtime:

- `katex`: equation parsing and rendering
- `mathjs`: safe function parsing/evaluation for graphing
- `plotly.js-dist-min`: graph chart rendering

These are listed in `dependencies` intentionally so they are installed automatically.

## Minimal Usage

```tsx
import { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcaliMath } from "@excalimath/core";

export default function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Excalidraw
        excalidrawAPI={setExcalidrawAPI}
        renderTopRightUI={() =>
          excalidrawAPI ? (
            <ExcaliMath
              excalidrawAPI={excalidrawAPI}
            />
          ) : null
        }
      />
    </div>
  );
}
```

## License

MIT
