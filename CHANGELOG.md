# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2026-04-20

### Added
- npm package keywords to improve discoverability
- Core package README with a simple, correct integration example

### Changed
- Core publish workflow updated to use npm Trusted Publishing via OIDC
- Core publish workflow now triggers from `core` branch

## [1.1.1] - 2026-04-20

### Fixed
- Graph rendering in dark themes — optimized color resolution for better visibility
- SVG padding for equations and graphs
- Equation preview handling for overflow scenarios

### Enhanced
- Sidebar UX with resize observer for better responsive behavior
- VS Code webview compatibility
- LaTeX input field minimum height

### Contributors
- DynoW — various UX and theme improvements

## [1.1.0] - 2026-04-05

### Added
- **Visual LaTeX toolbar** — 40+ clickable buttons across 6 groups (Structure, Operators, Calculus, Greek, Trig, Layout) for building equations without knowing LaTeX syntax
- **Excalidraw library export** — `scripts/export-libraries.cjs` generates `.excalidrawlib` files for all 6 shape packs, compatible with libraries.excalidraw.com
- Pre-built `.excalidrawlib` files included in `scripts/output/`

### Fixed
- Library panel import button now scrolls with content instead of pinned footer

## [0.1.0-desktop] - 2026-04-05

### Added
- **Desktop app** — Electrobun-based native shell under `apps/desktop/`
  - Full Excalidraw + ExcaliMath UI running in native WebView2 window
  - All features work fully offline (equations, graphs, shapes)
  - Portable distribution: unzip and run `bin/launcher.exe`
  - Packaging script: `npm run package` creates distributable .zip
  - CI workflow: GitHub Actions matrix build for macOS, Windows, Linux
- Desktop app is isolated from npm workspaces (uses Electrobun independently)

## [1.0.0] - 2026-04-04

### Added
- **Clean Component API** — `theme`, `initialData`, `onSave` props
- **Round-trip fidelity** — `restoreExcalimathFiles()` and `restoreExcalimathFilesAsync()` regenerate equation/graph SVGs from stored metadata on file load
- **`extractExcalimathData()`** — utility to extract all ExcaliMath metadata from a scene
- **Accessibility** — ARIA roles (`dialog`, `tablist`, `tab`, `tabpanel`), `aria-selected`, `aria-expanded`, `aria-label`, `aria-controls`
- **AuthorKit adapter spec** — reference specification with widget type, lifecycle, response capture, and React stub

## [0.3.0] - 2026-04-04

### Added
- **Shape Libraries** — 6 curriculum-aligned packs with 80+ shapes
  - Geometry (K-10): triangles, circles, polygons, coordinate grid, number line, protractor
  - Algebra (Gr 3-10): fraction bars, algebra tiles, Venn diagrams, function machine
  - Statistics (Gr 5-12): bar chart, pie chart, histogram, scatter plot, box plot
  - Physics/Circuits (Gr 8-12): 30 components including resistors, capacitors, transistors, all logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR, Buffer), meters, diodes, and more
  - Biology (Gr 5-12): cell diagrams, DNA helix, mitosis stages, food web
  - Chemistry (Gr 7-12): Bohr atom, periodic table tile, bond types, lab equipment
- **LibraryPanel UI** — searchable grid browser, pack filter/toggle, `.excalidrawlib` import
- **SVG shape support** — shapes with smooth bezier curves (logic gates) rendered as SVG images
- **Element grouping** — all multi-element shapes grouped for single-click selection and movement

## [0.2.0] - 2026-04-04

### Added
- **Graph Layer** — function plotting via Plotly.js with SVG output
  - Up to 5 colour-coded functions per graph with safe mathjs evaluation
  - Configurable axes: range, labels, grid, tick intervals
  - CSV data import for scatter and line plots
  - 7 preset templates: linear, parabola, trig, unit circle, number line, exponential, absolute value
  - Click-to-edit restores full graph configuration from element metadata
- **GraphPanel UI** — function input, axis config, data tab, templates tab, live preview

## [0.1.0] - 2026-04-04

### Added
- **Equation Layer** — LaTeX authoring via KaTeX
  - LaTeX input with live KaTeX preview (MathML output for data URL compatibility)
  - Insert rendered equations as Excalidraw image elements
  - Click-to-edit: click any equation to reopen in the editor
  - 40+ pre-built expression library across 9 categories
  - Graceful error handling with clear parse error messages
- **Core infrastructure**
  - `elementFactory` — SVG to Excalidraw imageElement conversion with data URLs
  - `stateBridge` — click-to-edit metadata detection via customData
- **Monorepo scaffold** — npm workspaces, Vite + TypeScript, MIT license
- **Demo app** — standalone app wrapping Excalidraw + ExcaliMath
