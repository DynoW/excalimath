/**
 * @module EquationPanel
 *
 * LaTeX equation editor panel with live KaTeX preview, expression library,
 * and error handling. Embedded inside the ExcaliMath sidebar.
 */

import { useState, useCallback, useMemo, useEffect } from "react";
import { renderLatexToSvg, validateLatex } from "../plugins/equation/renderer";
import {
  expressionLibrary,
  getCategories,
  filterExpressions,
  type ExpressionEntry,
} from "../plugins/equation/expressionLibrary";
import katex from "katex";
import { getTheme } from "./theme";

export interface EquationPanelProps {
  onInsert: (latex: string, svg: string, width: number, height: number) => void;
  editingLatex?: string | null;
  onClose: () => void;
  visible: boolean;
  isDark?: boolean;
}

export function EquationPanel({
  onInsert,
  editingLatex,
  onClose,
  visible,
  isDark = false,
}: EquationPanelProps) {
  const [latex, setLatex] = useState(editingLatex ?? "");
  const [showLibrary, setShowLibrary] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const t = useMemo(() => getTheme(isDark), [isDark]);

  useEffect(() => {
    if (editingLatex !== undefined && editingLatex !== null) {
      setLatex(editingLatex);
      setShowLibrary(false);
    }
  }, [editingLatex]);

  const validationError = useMemo(() => {
    if (!latex.trim()) return null;
    return validateLatex(latex);
  }, [latex]);

  const previewHtml = useMemo(() => {
    if (!latex.trim() || validationError) return "";
    try {
      return katex.renderToString(latex, { displayMode: true, throwOnError: false });
    } catch {
      return "";
    }
  }, [latex, validationError]);

  const categories = useMemo(() => getCategories(), []);
  const filteredExpressions = useMemo(
    () => filterExpressions(selectedCategory || undefined, searchTerm || undefined),
    [selectedCategory, searchTerm]
  );

  const handleInsert = useCallback(() => {
    if (!latex.trim() || validationError) return;
    const result = renderLatexToSvg(latex);
    onInsert(latex, result.svg, result.width, result.height);
  }, [latex, validationError, onInsert]);

  const handleExpressionClick = useCallback((entry: ExpressionEntry) => {
    setLatex(entry.latex);
    setShowLibrary(false);
  }, []);

  if (!visible) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", color: t.text }}>
      {/* Sub-tabs: Editor / Library */}
      <div style={{ display: "flex", borderBottom: `1px solid ${t.border}` }}>
        <button
          type="button"
          onClick={() => setShowLibrary(false)}
          style={{
            flex: 1, padding: "9px 12px", border: "none", background: "none",
            cursor: "pointer", fontSize: 12, fontWeight: 500,
            color: !showLibrary ? t.accent : t.textMuted,
            borderBottom: `2px solid ${!showLibrary ? t.accent : "transparent"}`,
            transition: "all 0.15s",
          }}
        >
          Editor
        </button>
        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          style={{
            flex: 1, padding: "9px 12px", border: "none", background: "none",
            cursor: "pointer", fontSize: 12, fontWeight: 500,
            color: showLibrary ? t.accent : t.textMuted,
            borderBottom: `2px solid ${showLibrary ? t.accent : "transparent"}`,
            transition: "all 0.15s",
          }}
        >
          Library ({expressionLibrary.length})
        </button>
      </div>

      {showLibrary ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderBottom: `1px solid ${t.borderLight}` }}>
            <input
              type="text"
              placeholder="Search expressions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1, padding: "7px 10px", border: `1px solid ${t.border}`,
                borderRadius: 6, fontSize: 12, outline: "none",
                backgroundColor: t.bgInput, color: t.text,
              }}
            />
            <select
              aria-label="Filter by category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: "7px 8px", border: `1px solid ${t.border}`,
                borderRadius: 6, fontSize: 11, outline: "none",
                backgroundColor: t.bgInput, color: t.text,
              }}
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 10px" }}>
            {filteredExpressions.map((entry, i) => (
              <button
                type="button"
                key={i}
                onClick={() => handleExpressionClick(entry)}
                title={entry.latex}
                style={{
                  display: "flex", flexDirection: "column", gap: 2, width: "100%",
                  padding: "8px 10px", border: "none", borderRadius: 6,
                  background: "none", cursor: "pointer", textAlign: "left",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = t.bgHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span
                  style={{ color: t.text }}
                  dangerouslySetInnerHTML={{
                    __html: katex.renderToString(entry.latex, {
                      displayMode: false,
                      throwOnError: false,
                    }),
                  }}
                />
                <span style={{ fontSize: 10, color: t.textFaint }}>{entry.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1, padding: "14px", display: "flex", flexDirection: "column",
          gap: 10, overflowY: "auto",
        }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            LaTeX Expression
          </label>
          <textarea
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            placeholder={'e.g. \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'}
            style={{
              width: "100%", padding: "9px 11px", border: `1px solid ${t.border}`,
              borderRadius: 6, fontFamily: '"Fira Code", "Cascadia Code", monospace',
              fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.5,
              backgroundColor: t.bgInput, color: t.text,
            }}
            rows={3}
            spellCheck={false}
            autoFocus
          />

          {validationError && (
            <div style={{
              padding: "8px 10px", backgroundColor: t.errorBg, borderRadius: 6,
              color: t.error, fontSize: 12, lineHeight: 1.4,
              border: `1px solid ${isDark ? "rgba(255,100,100,0.2)" : "#ffcccc"}`,
            }}>
              <strong>Parse error:</strong> {validationError}
            </div>
          )}

          {previewHtml && !validationError && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Preview
              </label>
              <div
                style={{
                  padding: "16px", backgroundColor: t.bgElevated, borderRadius: 6,
                  textAlign: "center", minHeight: 50, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  border: `1px solid ${t.borderLight}`, color: t.text,
                }}
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
          )}

          <div style={{ display: "flex", gap: 8, paddingTop: 4, marginTop: "auto" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1, padding: "9px 14px", border: `1px solid ${t.border}`,
                borderRadius: 6, background: t.bg, cursor: "pointer",
                fontSize: 13, fontWeight: 500, color: t.textMuted,
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInsert}
              disabled={!latex.trim() || !!validationError}
              style={{
                flex: 1, padding: "9px 14px", border: "none", borderRadius: 6,
                backgroundColor: t.accent, color: t.accentText, cursor: "pointer",
                fontSize: 13, fontWeight: 600,
                opacity: !latex.trim() || validationError ? 0.5 : 1,
              }}
            >
              {editingLatex ? "Update" : "Insert"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
