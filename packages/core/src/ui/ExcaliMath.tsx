/**
 * @module ExcaliMath
 *
 * Main wrapper component for the ExcaliMath plugin. Provides:
 * - Single toolbar icon that toggles a sidebar with tabbed navigation
 * - Theme-aware rendering (reads Excalidraw's light/dark mode)
 * - Clean component API: theme, initialData, onSave, enabledPlugins
 * - Round-trip fidelity: restores equations/graphs from saved files
 */

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { EquationPanel } from "./EquationPanel";
import { GraphPanel } from "./GraphPanel";
import { LibraryPanel } from "./LibraryPanel";
import { createImageElement } from "../core/elementFactory";
import { getSelectedExcalimathElement } from "../core/stateBridge";
import { restoreExcalimathFilesAsync, extractExcalimathData } from "../core/roundTrip";
import { shapeToExcalidrawElements } from "../plugins/geometry/registry";
import { getTheme } from "./theme";
import type { ExcalimathMetadata } from "../core/types";
import type { GraphConfig } from "../plugins/graph/types";
import type { LibraryShape } from "../plugins/geometry/types";

export type ActiveTab = "equation" | "graph" | "library" | null;

/** Serialisable scene data for save/load */
export interface ExcalimathSceneData {
  elements: any[];
  appState?: Record<string, unknown>;
  files?: Record<string, unknown>;
}

export interface ExcaliMathProps {
  /** The Excalidraw API ref, obtained from excalidrawAPI callback */
  excalidrawAPI: any;

  /** Which plugins to enable (defaults to all) */
  enabledPlugins?: Array<"equation" | "graph" | "library">;

  /** Override theme: "light" | "dark" | "auto" (auto reads from Excalidraw) */
  theme?: "light" | "dark" | "auto";

  /**
   * Initial scene data to load. When provided, ExcaliMath will restore
   * any equations and graphs by regenerating their SVG files from metadata.
   */
  initialData?: ExcalimathSceneData;

  /**
   * Called whenever the scene changes with an ExcaliMath action (insert,
   * update, delete). Receives the full scene data for persistence.
   */
  onSave?: (data: ExcalimathSceneData) => void;
}

export function ExcaliMath({
  excalidrawAPI,
  enabledPlugins = ["equation", "graph", "library"],
  theme = "auto",
  initialData,
  onSave,
}: ExcaliMathProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [editingLatex, setEditingLatex] = useState<string | null>(null);
  const [editingGraphConfig, setEditingGraphConfig] = useState<GraphConfig | null>(null);
  const editingElementIdRef = useRef<string | null>(null);
  const lastPolledSelectionRef = useRef<string | null>(null);
  const restoredRef = useRef(false);

  // ── Theme resolution ──
  const excalidrawTheme = excalidrawAPI?.getAppState?.()?.theme;
  const isDark = theme === "auto"
    ? excalidrawTheme === "dark"
    : theme === "dark";
  const t = useMemo(() => getTheme(isDark), [isDark]);

  const equationEnabled = enabledPlugins.includes("equation");
  const graphEnabled = enabledPlugins.includes("graph");
  const libraryEnabled = enabledPlugins.includes("library");
  const isOpen = activeTab !== null;

  // ── Round-trip restore ──
  // Monitors scene elements and regenerates SVG files for any ExcaliMath
  // elements that are missing their file data (e.g. after opening a saved
  // .excalidraw file via Excalidraw's native open dialog).
  const restoringRef = useRef(false);
  const knownFileIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!excalidrawAPI) return;

    const checkAndRestore = async () => {
      if (restoringRef.current) return;

      const elements = excalidrawAPI.getSceneElements();
      const files = excalidrawAPI.getFiles?.() || {};

      // Find ExcaliMath image elements whose fileId is missing from files
      const needsRestore: typeof elements = [];
      for (const el of elements) {
        if (
          el.type === "image" &&
          el.fileId &&
          el.customData?.excalimath_type &&
          !files[el.fileId] &&
          !knownFileIdsRef.current.has(el.fileId)
        ) {
          needsRestore.push(el);
        }
      }

      if (needsRestore.length === 0) return;

      // Mark as restoring to prevent re-entry
      restoringRef.current = true;

      try {
        const restored = await restoreExcalimathFilesAsync(needsRestore);
        if (restored.length > 0) {
          excalidrawAPI.addFiles(restored);
          // Track restored IDs so we don't re-process them
          for (const f of restored) {
            knownFileIdsRef.current.add(f.id);
          }
        }
      } catch (err) {
        console.warn("[ExcaliMath] Failed to restore elements:", err);
      } finally {
        restoringRef.current = false;
      }
    };

    // Check periodically for missing files (handles native open dialog)
    checkAndRestore();
    const interval = setInterval(checkAndRestore, 1500);
    return () => clearInterval(interval);
  }, [excalidrawAPI]);

  // ── Load initial data if provided ──
  useEffect(() => {
    if (!excalidrawAPI || !initialData) return;

    if (initialData.elements?.length > 0) {
      excalidrawAPI.updateScene({ elements: initialData.elements });
      // The periodic check above will handle restoring files
    }
  }, [excalidrawAPI, initialData]);

  // ── Save helper ──
  const emitSave = useCallback(() => {
    if (!onSave || !excalidrawAPI) return;
    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const files = excalidrawAPI.getFiles?.() || {};
    onSave({ elements, appState, files });
  }, [onSave, excalidrawAPI]);

  // ── Helpers ──

  const getSelectedElement = useCallback(() => {
    if (!excalidrawAPI) return null;
    const appState = excalidrawAPI.getAppState();
    const selectedIds = appState.selectedElementIds || {};
    const ids = Object.keys(selectedIds).filter((id) => selectedIds[id]);
    if (ids.length !== 1) return null;

    const elements = excalidrawAPI.getSceneElements();
    const selected = elements.filter((el: any) => ids.includes(el.id));
    return getSelectedExcalimathElement(selected);
  }, [excalidrawAPI]);

  // ── Auto-update on canvas selection ──
  // When the sidebar is open and user selects an equation/graph on canvas,
  // automatically switch to edit mode for that element.
  // When deselecting an element, drop back to insert mode.
  useEffect(() => {
    if (!excalidrawAPI || activeTab === null) return;

    const checkSelection = () => {
      const appState = excalidrawAPI.getAppState();
      const selectedIds = appState.selectedElementIds || {};
      const activeIds = Object.keys(selectedIds).filter((id) => selectedIds[id]);
      const currentSelectedId = activeIds.length === 1 ? activeIds[0] : null;

      // Only act if the canvas selection has distinctly changed
      if (currentSelectedId === lastPolledSelectionRef.current) {
        return;
      }

      lastPolledSelectionRef.current = currentSelectedId;
      const selected = getSelectedElement();

      if (!selected) {
        // User deselected or selected a non-ExcaliMath element -> Insert mode
        if (editingElementIdRef.current !== null) {
          setEditingLatex(null);
          setEditingGraphConfig(null);
          editingElementIdRef.current = null;
        }
        return;
      }

      // User selected an ExcaliMath element -> Edit mode
      if (selected.type === "equation") {
        setEditingLatex(selected.data.latex);
        editingElementIdRef.current = selected.data.elementId;
        setActiveTab("equation");
      } else if (selected.type === "graph") {
        try {
          setEditingGraphConfig(JSON.parse(selected.data.config));
          editingElementIdRef.current = selected.data.elementId;
          setActiveTab("graph");
        } catch { /* ignore */ }
      }
    };

    // Check immediately in case selection changed before sidebar opened
    checkSelection();

    // Poll for selection changes while sidebar is open
    const interval = setInterval(checkSelection, 100);
    return () => clearInterval(interval);
  }, [excalidrawAPI, activeTab, getSelectedElement]);

  const upsertElement = useCallback(
    (svg: string, width: number, height: number, metadata: ExcalimathMetadata) => {
      if (!excalidrawAPI) return undefined;

      const appState = excalidrawAPI.getAppState();

      if (editingElementIdRef.current) {
        const elements = excalidrawAPI.getSceneElements();
        const existing = elements.find(
          (el: any) => el.id === editingElementIdRef.current
        );
        const x = existing?.x ?? 100;
        const y = existing?.y ?? 100;

        const { element, fileEntry, fileId } = createImageElement({
          svg, width, height, metadata, x, y,
        });

        knownFileIdsRef.current.add(fileId);
        excalidrawAPI.addFiles([fileEntry]);
        const updatedElements = elements.map((el: any) =>
          el.id === editingElementIdRef.current
            ? { ...element, id: el.id }
            : el
        );
        excalidrawAPI.updateScene({
          elements: updatedElements,
          appState: {
            ...appState,
            selectedElementIds: { [editingElementIdRef.current]: true }
          }
        });
        emitSave();
        return editingElementIdRef.current;
      } else {
        const centerX =
          (appState.scrollX * -1 + appState.width / 2) / appState.zoom.value -
          width / 2;
        const centerY =
          (appState.scrollY * -1 + appState.height / 2) / appState.zoom.value -
          height / 2;

        const { element, fileEntry, fileId } = createImageElement({
          svg, width, height, metadata, x: centerX, y: centerY,
        });

        knownFileIdsRef.current.add(fileId);
        excalidrawAPI.addFiles([fileEntry]);
        const currentElements = excalidrawAPI.getSceneElements();
        excalidrawAPI.updateScene({
          elements: [...currentElements, element],
          appState: {
            ...appState,
            selectedElementIds: { [element.id]: true }
          }
        });
        emitSave();
        return element.id;
      }
    },
    [excalidrawAPI, emitSave]
  );

  // ── Tab switching ──

  const handleToggle = useCallback(() => {
    if (isOpen) {
      setActiveTab(null);
      setEditingLatex(null);
      setEditingGraphConfig(null);
      editingElementIdRef.current = null;
    } else {
      const selected = getSelectedElement();
      if (selected?.type === "equation") {
        setEditingLatex(selected.data.latex);
        editingElementIdRef.current = selected.data.elementId;
        setActiveTab("equation");
      } else if (selected?.type === "graph") {
        try {
          setEditingGraphConfig(JSON.parse(selected.data.config));
          editingElementIdRef.current = selected.data.elementId;
        } catch { /* ignore */ }
        setActiveTab("graph");
      } else {
        setActiveTab(equationEnabled ? "equation" : graphEnabled ? "graph" : "library");
      }
    }
  }, [isOpen, getSelectedElement, equationEnabled, graphEnabled]);

  const switchTab = useCallback((tab: ActiveTab) => {
    setEditingLatex(null);
    setEditingGraphConfig(null);
    editingElementIdRef.current = null;

    if (tab === "equation") {
      const selected = getSelectedElement();
      if (selected?.type === "equation") {
        setEditingLatex(selected.data.latex);
        editingElementIdRef.current = selected.data.elementId;
      }
    } else if (tab === "graph") {
      const selected = getSelectedElement();
      if (selected?.type === "graph") {
        try {
          setEditingGraphConfig(JSON.parse(selected.data.config));
          editingElementIdRef.current = selected.data.elementId;
        } catch { /* ignore */ }
      }
    }

    setActiveTab(tab);
  }, [getSelectedElement]);

  // ── Insert handlers ──

  const handleInsertEquation = useCallback(
    (latex: string, svg: string, width: number, height: number) => {
      const newId = upsertElement(svg, width, height, {
        excalimath_type: "equation",
        excalimath_source: "equation-panel",
        excalimath_latex: latex,
      });
      if (newId) {
        editingElementIdRef.current = newId;
        setEditingLatex(latex);
      }
    },
    [upsertElement]
  );

  const handleInsertGraph = useCallback(
    (config: GraphConfig, svg: string, width: number, height: number) => {
      const newId = upsertElement(svg, width, height, {
        excalimath_type: "graph",
        excalimath_source: "graph-panel",
        excalimath_graph_config: JSON.stringify(config),
      });
      if (newId) {
        editingElementIdRef.current = newId;
        setEditingGraphConfig(config);
      }
    },
    [upsertElement]
  );

  const handleInsertShape = useCallback(
    (shape: LibraryShape) => {
      if (!excalidrawAPI) return;
      const appState = excalidrawAPI.getAppState();
      const centerX =
        (appState.scrollX * -1 + appState.width / 2) / appState.zoom.value;
      const centerY =
        (appState.scrollY * -1 + appState.height / 2) / appState.zoom.value;

      const result = shapeToExcalidrawElements(shape, centerX - 50, centerY - 50);
      if (result.files.length > 0) {
        excalidrawAPI.addFiles(result.files);
      }
      const currentElements = excalidrawAPI.getSceneElements();
      excalidrawAPI.updateScene({
        elements: [...currentElements, ...result.elements],
      });
      emitSave();
    },
    [excalidrawAPI, emitSave]
  );

  const handleClose = useCallback(() => {
    setActiveTab(null);
    setEditingLatex(null);
    setEditingGraphConfig(null);
    editingElementIdRef.current = null;
  }, []);

  // ── Tab definitions ──

  const tabs = useMemo(() => {
    const list: { id: ActiveTab; label: string; icon: string }[] = [];
    if (equationEnabled) list.push({ id: "equation", label: "Equation", icon: "∑" });
    if (graphEnabled) list.push({ id: "graph", label: "Graph", icon: "ƒ" });
    if (libraryEnabled) list.push({ id: "library", label: "Shapes", icon: "△" });
    return list;
  }, [equationEnabled, graphEnabled, libraryEnabled]);

  return (
    <>
      {/* ── Toolbar toggle button ── */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Toggle ExcaliMath panel"
        aria-expanded={isOpen ? "true" : "false"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          backgroundColor: isOpen ? t.accent : t.bg,
          color: isOpen ? t.accentText : t.accent,
          cursor: "pointer",
          fontSize: 18,
          fontWeight: 700,
          boxShadow: `0 1px 4px ${t.shadow}`,
          transition: "all 0.15s",
          fontFamily: "serif",
        }}
        title="ExcaliMath"
      >
        ∑
      </button>

      {/* ── Sidebar ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="ExcaliMath"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: 380,
            zIndex: 1000,
            backgroundColor: t.bg,
            borderLeft: `1px solid ${t.border}`,
            display: "flex",
            flexDirection: "column",
            boxShadow: `-4px 0 20px ${t.shadow}`,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* ── Header with tabs ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: `1px solid ${t.border}`,
              padding: "0 8px",
              height: 48,
              gap: 0,
            }}
          >
            <div role="tablist" aria-label="ExcaliMath tools" style={{ display: "flex", flex: 1, gap: 2 }}>
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id ? "true" : "false"}
                  aria-controls={`excalimath-panel-${tab.id}`}
                  onClick={() => switchTab(tab.id)}
                  title={tab.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    border: "none",
                    borderRadius: 8,
                    backgroundColor:
                      activeTab === tab.id ? t.accentMuted : "transparent",
                    color:
                      activeTab === tab.id ? t.accent : t.textMuted,
                    cursor: "pointer",
                    fontSize: 20,
                    fontWeight: 600,
                    transition: "all 0.15s",
                    fontFamily: "serif",
                  }}
                >
                  {tab.icon}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close ExcaliMath panel"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                border: "none",
                borderRadius: 6,
                backgroundColor: "transparent",
                color: t.textMuted,
                cursor: "pointer",
                fontSize: 20,
                transition: "color 0.15s",
              }}
            >
              ×
            </button>
          </div>

          {/* ── Panel content ── */}
          <div
            role="tabpanel"
            id={`excalimath-panel-${activeTab}`}
            style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}
          >
            <style>
              {`
                /* Hide KaTeX MathML so it doesn't show double text */
                .katex-mathml {
                  display: none;
                }

                @media (max-width: 730px) {
                  /* Push ExcaliMath container content up so it's not hidden by bottom bars */
                  #excalimath-panel-${activeTab} {
                    padding-bottom: 60px !important;
                  }
                }
              `}
            </style>
            
            {activeTab === "equation" && equationEnabled && (
              <EquationPanel
                visible={true}
                onInsert={handleInsertEquation}
                editingLatex={editingLatex}
                onClose={handleClose}
                isDark={isDark}
              />
            )}
            {activeTab === "graph" && graphEnabled && (
              <GraphPanel
                visible={true}
                onInsert={handleInsertGraph}
                editingConfig={editingGraphConfig}
                onClose={handleClose}
                isDark={isDark}
              />
            )}
            {activeTab === "library" && libraryEnabled && (
              <LibraryPanel
                visible={true}
                onInsert={handleInsertShape}
                onClose={handleClose}
                isDark={isDark}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
