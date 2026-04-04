# Contributing to ExcaliMath

Thank you for your interest in contributing to ExcaliMath! Whether it's a bug report, feature request, or code contribution, we appreciate your help.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [Reporting Issues](#reporting-issues)
- [Adding Shape Libraries](#adding-shape-libraries)

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/excalimath.git
   cd excalimath
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) to see the demo app

## Development Workflow

This is a monorepo managed with npm workspaces:

- `packages/core` — The `@excalimath/core` library (the plugin itself)
- `apps/demo` — A standalone demo app that wraps Excalidraw + ExcaliMath

### Common commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the demo app in dev mode (hot reload) |
| `npm run build` | Build all packages (core first, then demo) |
| `npm run build:core` | Build only the core package |
| `npm run lint` | Run ESLint across the project |
| `npm run typecheck` | Run TypeScript type checking |

### Typical workflow

1. Create a feature branch from `main`
2. Make changes in `packages/core/src/`
3. Test changes via the demo app (`npm run dev`)
4. Ensure `npm run build` passes with no errors
5. Open a PR against `main`

## Project Structure

```
packages/core/src/
├── core/                  # Infrastructure shared across plugins
│   ├── elementFactory.ts  # SVG → Excalidraw imageElement conversion
│   ├── stateBridge.ts     # Click-to-edit: detects selected ExcaliMath elements
│   └── types.ts           # Shared TypeScript types
├── plugins/
│   ├── equation/          # LaTeX equation plugin (KaTeX)
│   ├── graph/             # Function graph plugin (Plotly + mathjs)
│   └── geometry/          # Shape library plugin
│       ├── packs/         # Individual shape pack definitions
│       └── registry.ts    # Pack loader + element converter
└── ui/                    # React UI components
    ├── ExcaliMath.tsx      # Main wrapper (toolbar + panel orchestration)
    ├── EquationPanel.tsx   # LaTeX editor sidebar
    ├── GraphPanel.tsx      # Function plotter sidebar
    └── LibraryPanel.tsx    # Shape browser sidebar
```

## Code Style

- **TypeScript** — Strict mode enabled. All code must type-check cleanly.
- **React** — Functional components with hooks. No class components.
- **Exports** — Named exports preferred over default exports.
- **Comments** — Add JSDoc comments on exported functions and interfaces. Add inline comments only where the logic isn't self-evident.
- **Formatting** — 2-space indent, no trailing whitespace.
- **No `eval()`** — Math expressions are parsed with mathjs. Never use `eval()` or `new Function()`.

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add polar coordinate mode to graph plugin
fix: correct SVG dimensions for multi-line equations
docs: update API reference in README
refactor: extract shared axis config into utility
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`

## Pull Requests

1. Keep PRs focused — one feature or fix per PR
2. Include a clear description of what changed and why
3. Ensure `npm run build` passes
4. Add/update comments for any new exported APIs
5. If adding a new shape, follow the [Adding Shape Libraries](#adding-shape-libraries) guide below

## Reporting Issues

Use [GitHub Issues](https://github.com/tamerUAE/excalimath/issues) to report bugs or request features. Please include:

- **Bugs**: Steps to reproduce, expected vs actual behaviour, browser/OS info
- **Features**: Use case description, proposed approach (if any)

## Adding Shape Libraries

Shape packs live in `packages/core/src/plugins/geometry/packs/`. Each pack is a TypeScript file exporting an array of `LibraryShape` objects.

### Native element shapes

For shapes made of basic geometric primitives (rectangles, lines, circles):

```typescript
export const myShapes: LibraryShape[] = [
  {
    name: "My Shape",
    elements: [
      { type: "rectangle", x: 0, y: 0, width: 80, height: 60,
        strokeColor: "#1e1e1e", strokeWidth: 2, roughness: 0 },
      { type: "text", x: 20, y: 20, width: 40, height: 16,
        text: "Label", fontSize: 14, fontFamily: 1, strokeColor: "#1e1e1e" },
    ],
  },
];
```

### SVG shapes (for smooth curves)

For shapes that need bezier curves (e.g. logic gates), use the `svg` field:

```typescript
{
  name: "My Curved Shape",
  elements: [],
  svgWidth: 90,
  svgHeight: 50,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="50"
         fill="none" stroke="#1e1e1e" stroke-width="2">
    <path d="M10,0 Q50,25 10,50"/>
  </svg>`,
}
```

After creating a pack file, register it in `registry.ts` by importing it and adding it to the `builtInPacks` array.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
