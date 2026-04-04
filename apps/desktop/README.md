# ExcaliMath Desktop

Offline-installable desktop app for ExcaliMath, powered by [Electrobun](https://github.com/nicbarker/electrobun).

## Prerequisites

- [Node.js](https://nodejs.org) 18+ (for building the web app)
- [Electrobun](https://electrobun.dev) is installed as an npm dependency — no separate install needed

## Development

```bash
# From the repo root, build the web app first
npm run build

# Then from this directory
cd apps/desktop
npx electrobun dev
```

## Building Installers

```bash
npx electrobun build
```

Build output goes to `build/` (dev) or `artifacts/` (production).

## Architecture

```
src/
├── bun/
│   └── index.ts          Electrobun main process — creates BrowserWindow
└── views/
    └── mainview/
        ├── index.html    Loads the ExcaliMath web app
        └── index.ts      Renderer entry point
```

The desktop app is a thin native shell around the same `@excalimath/core` package used by the web demo. All math rendering happens in the web view.
