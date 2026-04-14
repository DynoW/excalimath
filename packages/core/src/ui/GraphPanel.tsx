/**
 * @module GraphPanel
 *
 * Function graph plotter panel with multi-function support, axis config,
 * CSV data import, templates, and live Plotly preview.
 * Embedded inside the ExcaliMath sidebar.
 */

import { useState, useCallback, useEffect, useMemo } from "react";
import { validateExpression } from "../plugins/graph/evaluator";
import { renderGraphToSvg, parseCsvData } from "../plugins/graph/plotRenderer";
import { plotTemplates } from "../plugins/graph/templates";
import {
  TRACE_COLORS,
  createDefaultGraphConfig,
  type GraphConfig,
  type FunctionTrace,
  type DataTrace,
} from "../plugins/graph/types";
import { getTheme } from "./theme";

export interface GraphPanelProps {
  onInsert: (config: GraphConfig, svg: string, width: number, height: number) => void;
  editingConfig?: GraphConfig | null;
  onClose: () => void;
  visible: boolean;
  isDark?: boolean;
}

type Tab = "functions" | "data" | "templates";

export function GraphPanel({
  onInsert,
  editingConfig,
  onClose,
  visible,
  isDark = false,
}: GraphPanelProps) {
  const [config, setConfig] = useState<GraphConfig>(
    editingConfig ?? createDefaultGraphConfig()
  );
  const [activeTab, setActiveTab] = useState<Tab>("functions");
  const [csvText, setCsvText] = useState("");
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [previewSvg, setPreviewSvg] = useState("");
  const [rendering, setRendering] = useState(false);
  const [renderError, setRenderError] = useState("");
  const t = useMemo(() => getTheme(isDark), [isDark]);

  useEffect(() => {
    if (editingConfig) {
      setConfig(editingConfig);
      setActiveTab("functions");
    } else {
      setConfig(createDefaultGraphConfig());
    }
  }, [editingConfig]);

  useEffect(() => {
    const newErrors: Record<number, string> = {};
    config.functions.forEach((fn, i) => {
      if (fn.expression.trim()) {
        const err = validateExpression(fn.expression);
        if (err) newErrors[i] = err;
      }
    });
    setErrors(newErrors);
  }, [config.functions]);

  // Auto-preview with debounce
  useEffect(() => {
    const hasValidFunctions = config.functions.some(
      (fn) => fn.expression.trim() && !validateExpression(fn.expression)
    );
    const hasData = config.dataTraces.length > 0;
    if (!hasValidFunctions && !hasData) {
      setPreviewSvg("");
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        setRendering(true);
        setRenderError("");
        const result = await renderGraphToSvg(config, {
          isDark,
          purpose: "preview",
        });
        setPreviewSvg(result.svg);
      } catch (err) {
        setRenderError(err instanceof Error ? err.message : "Render failed");
        setPreviewSvg("");
      } finally {
        setRendering(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [config, isDark]);

  const updateFunction = useCallback((index: number, updates: Partial<FunctionTrace>) => {
    setConfig((prev) => ({
      ...prev,
      functions: prev.functions.map((fn, i) =>
        i === index ? { ...fn, ...updates } : fn
      ),
    }));
  }, []);

  const addFunction = useCallback(() => {
    setConfig((prev) => {
      if (prev.functions.length >= 5) return prev;
      return {
        ...prev,
        functions: [
          ...prev.functions,
          { expression: "", color: TRACE_COLORS[prev.functions.length % TRACE_COLORS.length] },
        ],
      };
    });
  }, []);

  const removeFunction = useCallback((index: number) => {
    setConfig((prev) => ({
      ...prev,
      functions: prev.functions.filter((_, i) => i !== index),
    }));
  }, []);

  const handleAxisChange = useCallback(
    (field: string, value: string | boolean) => {
      setConfig((prev) => ({
        ...prev,
        axis: {
          ...prev.axis,
          [field]: typeof value === "boolean" ? value : parseFloat(value as string) || 0,
        },
      }));
    }, []
  );

  const handleAxisLabelChange = useCallback(
    (field: "xLabel" | "yLabel", value: string) => {
      setConfig((prev) => ({ ...prev, axis: { ...prev.axis, [field]: value } }));
    }, []
  );

  const handleAddCsvData = useCallback(() => {
    try {
      const { xValues, yValues } = parseCsvData(csvText);
      const newTrace: DataTrace = {
        xValues, yValues, mode: "scatter",
        color: TRACE_COLORS[config.dataTraces.length % TRACE_COLORS.length],
        label: `Data ${config.dataTraces.length + 1}`,
      };
      setConfig((prev) => ({ ...prev, dataTraces: [...prev.dataTraces, newTrace] }));
      setCsvText("");
    } catch (err) {
      setRenderError(err instanceof Error ? err.message : "Invalid CSV data");
    }
  }, [csvText, config.dataTraces.length]);

  const removeDataTrace = useCallback((index: number) => {
    setConfig((prev) => ({ ...prev, dataTraces: prev.dataTraces.filter((_, i) => i !== index) }));
  }, []);

  const handleTemplateClick = useCallback((template: typeof plotTemplates[0]) => {
    setConfig(structuredClone(template.config));
    setActiveTab("functions");
  }, []);

  const handleInsert = useCallback(async () => {
    try {
      setRendering(true);
      const result = await renderGraphToSvg(config, {
        isDark,
        purpose: "insert",
      });
      onInsert(config, result.svg, result.width, result.height);
    } catch (err) {
      setRenderError(err instanceof Error ? err.message : "Failed to render graph");
    } finally {
      setRendering(false);
    }
  }, [config, onInsert, isDark]);

  const hasValidContent =
    config.functions.some((fn, i) => fn.expression.trim() && !errors[i]) ||
    config.dataTraces.length > 0;

  if (!visible) return null;

  const subTabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: "8px 8px", border: "none", background: "none",
    cursor: "pointer", fontSize: 11, fontWeight: 500,
    color: active ? t.accent : t.textMuted,
    borderBottom: `2px solid ${active ? t.accent : "transparent"}`,
    transition: "all 0.15s",
  });

  const inputStyle: React.CSSProperties = {
    padding: "7px 10px", border: `1px solid ${t.border}`, borderRadius: 5,
    fontSize: 12, outline: "none", backgroundColor: t.bgInput, color: t.text,
    width: "100%", boxSizing: "border-box", minWidth: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: t.textMuted,
    textTransform: "uppercase", letterSpacing: "0.5px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", color: t.text }}>
      {/* Sub-tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${t.border}` }}>
        {(["functions", "data", "templates"] as Tab[]).map((tab) => (
          <button type="button" key={tab} onClick={() => setActiveTab(tab)} style={subTabStyle(activeTab === tab)}>
            {tab === "functions" ? "Functions" : tab === "data" ? "Data" : `Templates (${plotTemplates.length})`}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        {/* Functions tab */}
        {activeTab === "functions" && (
          <>
            {config.functions.map((fn, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: fn.color, flexShrink: 0 }} />
                <input
                  type="text" value={fn.expression}
                  onChange={(e) => updateFunction(i, { expression: e.target.value })}
                  placeholder="e.g. sin(x), x^2 + 2*x"
                  spellCheck={false}
                  style={{
                    ...inputStyle, flex: 1,
                    fontFamily: '"Fira Code", "Cascadia Code", monospace',
                    borderColor: errors[i] ? t.error : t.border,
                  }}
                />
                {config.functions.length > 1 && (
                  <button type="button" onClick={() => removeFunction(i)}
                    style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", color: t.textFaint, padding: "2px 4px" }}>
                    ×
                  </button>
                )}
                {errors[i] && <div style={{ width: "100%", paddingLeft: 16, fontSize: 10, color: t.error }}>{errors[i]}</div>}
              </div>
            ))}
            {config.functions.length < 5 && (
              <button type="button" onClick={addFunction}
                style={{ padding: "7px 10px", border: `1px dashed ${t.border}`, borderRadius: 6, background: "none", cursor: "pointer", fontSize: 12, color: t.accent, fontWeight: 500 }}>
                + Add function
              </button>
            )}

            {/* Axis config */}
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8, paddingTop: 10, borderTop: `1px solid ${t.borderLight}` }}>
              <label style={labelStyle}>Axis Settings</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {([["xMin", "X min"], ["xMax", "X max"], ["yMin", "Y min"], ["yMax", "Y max"]] as const).map(([field, label]) => (
                  <div key={field} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 10, color: t.textFaint }}>{label}</span>
                    <input type="number" value={config.axis[field]} onChange={(e) => handleAxisChange(field, e.target.value)} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 10, color: t.textFaint }}>X label</span>
                  <input type="text" value={config.axis.xLabel} onChange={(e) => handleAxisLabelChange("xLabel", e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 10, color: t.textFaint }}>Y label</span>
                  <input type="text" value={config.axis.yLabel} onChange={(e) => handleAxisLabelChange("yLabel", e.target.value)} style={inputStyle} />
                </div>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: t.textMuted, cursor: "pointer" }}>
                <input type="checkbox" checked={config.axis.showGrid} onChange={(e) => handleAxisChange("showGrid", e.target.checked)} />
                Show grid
              </label>

              {/* Background colour */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <label style={{ ...labelStyle, margin: 0, flexShrink: 0 }}>Background</label>
                <div style={{ display: "flex", gap: 4, flex: 1, flexWrap: "wrap" }}>
                  {[
                    { value: "transparent", label: "None" },
                    { value: "#ffffff", label: "" },
                    { value: "#f8f9fa", label: "" },
                    { value: "#1e1e1e", label: "" },
                    { value: "#fff9db", label: "" },
                    { value: "#e7f5ff", label: "" },
                    { value: "#ebfbee", label: "" },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setConfig((prev) => ({ ...prev, backgroundColor: opt.value }))}
                      title={opt.value === "transparent" ? "Transparent" : opt.value}
                      style={{
                        width: opt.label === "None" ? "auto" : 22,
                        height: 22,
                        padding: opt.label === "None" ? "0 8px" : 0,
                        borderRadius: 4,
                        border: config.backgroundColor === opt.value
                          ? `2px solid ${t.accent}`
                          : `1px solid ${t.border}`,
                        backgroundColor: opt.value === "transparent" ? t.bgInput : opt.value,
                        cursor: "pointer",
                        fontSize: 9,
                        color: t.textMuted,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {opt.label === "None" ? "None" : opt.value === "transparent" ? "⊘" : ""}
                    </button>
                  ))}
                  <input
                    type="color"
                    value={config.backgroundColor === "transparent" ? "#ffffff" : config.backgroundColor}
                    onChange={(e) => setConfig((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                    title="Custom colour"
                    style={{
                      width: 22, height: 22, padding: 0, border: `1px solid ${t.border}`,
                      borderRadius: 4, cursor: "pointer", backgroundColor: "transparent",
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Data tab */}
        {activeTab === "data" && (
          <>
            <label style={labelStyle}>Paste CSV Data (x, y)</label>
            <textarea
              value={csvText} onChange={(e) => setCsvText(e.target.value)}
              placeholder={"x, y\n1, 2\n2, 4\n3, 1\n4, 7"} rows={5} spellCheck={false}
              style={{
                ...inputStyle, fontFamily: '"Fira Code", "Cascadia Code", monospace',
                resize: "vertical", lineHeight: 1.5,
              }}
            />
            <button type="button" onClick={handleAddCsvData} disabled={!csvText.trim()}
              style={{
                padding: "7px 10px", border: `1px dashed ${t.border}`, borderRadius: 6,
                background: "none", cursor: csvText.trim() ? "pointer" : "not-allowed",
                fontSize: 12, color: t.accent, fontWeight: 500, opacity: csvText.trim() ? 1 : 0.5,
              }}>
              + Add data trace
            </button>
            {config.dataTraces.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <label style={labelStyle}>Data Traces</label>
                {config.dataTraces.map((dt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 0" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: dt.color }} />
                    <span style={{ flex: 1, fontSize: 12, color: t.text }}>
                      {dt.label} ({dt.xValues.length} pts)
                    </span>
                    <button type="button" onClick={() => removeDataTrace(i)}
                      style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", color: t.textFaint }}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Templates tab */}
        {activeTab === "templates" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {plotTemplates.map((tpl, i) => (
              <button type="button" key={i} onClick={() => handleTemplateClick(tpl)}
                style={{
                  display: "flex", flexDirection: "column", gap: 3, padding: "12px 10px",
                  border: `1px solid ${t.borderLight}`, borderRadius: 8,
                  background: t.bgElevated, cursor: "pointer", textAlign: "left",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.borderLight)}>
                <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{tpl.name}</span>
                <span style={{ fontSize: 11, color: t.textFaint }}>{tpl.description}</span>
              </button>
            ))}
          </div>
        )}

        {/* Preview */}
        {previewSvg && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6, width: "100%" }}>
            <label style={labelStyle}>Preview</label>
            <div
              style={{
                backgroundColor: t.bgElevated, borderRadius: 6,
                border: `1px solid ${t.borderLight}`, overflowX: "auto", overflowY: "hidden",
                display: "block",
                padding: "8px", minHeight: 150
              }}
              dangerouslySetInnerHTML={{ __html: previewSvg }}
            />
          </div>
        )}

        {rendering && <div style={{ fontSize: 12, color: t.textFaint, textAlign: "center", padding: 6 }}>Rendering...</div>}
        {renderError && (
          <div style={{ padding: "8px 10px", backgroundColor: t.errorBg, borderRadius: 6, color: t.error, fontSize: 12 }}>
            {renderError}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, paddingTop: 4, marginTop: "auto" }}>
          <button type="button" onClick={onClose}
            style={{ flex: 1, padding: "9px 14px", border: `1px solid ${t.border}`, borderRadius: 6, background: t.bg, cursor: "pointer", fontSize: 13, fontWeight: 500, color: t.textMuted }}>
            Cancel
          </button>
          <button type="button" onClick={handleInsert} disabled={!hasValidContent || rendering}
            style={{
              flex: 1, padding: "9px 14px", border: "none", borderRadius: 6,
              backgroundColor: t.accent, color: t.accentText, cursor: "pointer",
              fontSize: 13, fontWeight: 600, opacity: !hasValidContent || rendering ? 0.5 : 1,
            }}>
            {rendering ? "Rendering..." : editingConfig ? "Update" : "Insert"}
          </button>
        </div>
      </div>
    </div>
  );
}
