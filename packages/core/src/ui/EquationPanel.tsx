/**
 * @module EquationPanel
 *
 * LaTeX equation editor with visual toolbar, live preview, and expression
 * library. Users can either type LaTeX directly or use the toolbar buttons
 * to insert common structures without knowing the syntax.
 */

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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

/** Visual toolbar button definitions */
interface ToolbarButton {
  /** Rendered label (KaTeX or plain text) */
  label: string;
  /** Whether to render label as KaTeX */
  isKatex?: boolean;
  /** LaTeX template to insert. Use ◻ as cursor placeholder. */
  template: string;
  /** Tooltip */
  title: string;
}

const toolbarGroups: { name: string; buttons: ToolbarButton[] }[] = [
  {
    name: "Structure",
    buttons: [
      { label: "\\frac{a}{b}", isKatex: true, template: "\\frac{◻}{◻}", title: "Fraction" },
      { label: "x^{n}", isKatex: true, template: "^{◻}", title: "Superscript" },
      { label: "x_{n}", isKatex: true, template: "_{◻}", title: "Subscript" },
      { label: "\\sqrt{x}", isKatex: true, template: "\\sqrt{◻}", title: "Square root" },
      { label: "\\sqrt[n]{x}", isKatex: true, template: "\\sqrt[◻]{◻}", title: "nth root" },
      { label: "()", template: "\\left( ◻ \\right)", title: "Parentheses" },
    ],
  },
  {
    name: "Operators",
    buttons: [
      { label: "\\pm", isKatex: true, template: "\\pm ", title: "Plus-minus" },
      { label: "\\times", isKatex: true, template: "\\times ", title: "Times" },
      { label: "\\div", isKatex: true, template: "\\div ", title: "Divide" },
      { label: "\\cdot", isKatex: true, template: "\\cdot ", title: "Dot" },
      { label: "\\leq", isKatex: true, template: "\\leq ", title: "Less or equal" },
      { label: "\\geq", isKatex: true, template: "\\geq ", title: "Greater or equal" },
      { label: "\\neq", isKatex: true, template: "\\neq ", title: "Not equal" },
      { label: "\\approx", isKatex: true, template: "\\approx ", title: "Approximately" },
    ],
  },
  {
    name: "Calculus",
    buttons: [
      { label: "\\int", isKatex: true, template: "\\int_{◻}^{◻} ◻ \\, d◻", title: "Integral" },
      { label: "\\sum", isKatex: true, template: "\\sum_{◻}^{◻} ◻", title: "Summation" },
      { label: "\\prod", isKatex: true, template: "\\prod_{◻}^{◻} ◻", title: "Product" },
      { label: "\\lim", isKatex: true, template: "\\lim_{◻ \\to ◻} ◻", title: "Limit" },
      { label: "\\frac{d}{dx}", isKatex: true, template: "\\frac{d}{d◻} ◻", title: "Derivative" },
      { label: "\\frac{\\partial}{\\partial x}", isKatex: true, template: "\\frac{\\partial}{\\partial ◻} ◻", title: "Partial derivative" },
      { label: "\\infty", isKatex: true, template: "\\infty", title: "Infinity" },
    ],
  },
  {
    name: "Greek",
    buttons: [
      { label: "\\alpha", isKatex: true, template: "\\alpha", title: "Alpha" },
      { label: "\\beta", isKatex: true, template: "\\beta", title: "Beta" },
      { label: "\\gamma", isKatex: true, template: "\\gamma", title: "Gamma" },
      { label: "\\delta", isKatex: true, template: "\\delta", title: "Delta" },
      { label: "\\theta", isKatex: true, template: "\\theta", title: "Theta" },
      { label: "\\lambda", isKatex: true, template: "\\lambda", title: "Lambda" },
      { label: "\\pi", isKatex: true, template: "\\pi", title: "Pi" },
      { label: "\\sigma", isKatex: true, template: "\\sigma", title: "Sigma" },
      { label: "\\omega", isKatex: true, template: "\\omega", title: "Omega" },
      { label: "\\Delta", isKatex: true, template: "\\Delta", title: "Delta (capital)" },
      { label: "\\Sigma", isKatex: true, template: "\\Sigma", title: "Sigma (capital)" },
    ],
  },
  {
    name: "Trig",
    buttons: [
      { label: "\\sin", isKatex: true, template: "\\sin(◻)", title: "Sine" },
      { label: "\\cos", isKatex: true, template: "\\cos(◻)", title: "Cosine" },
      { label: "\\tan", isKatex: true, template: "\\tan(◻)", title: "Tangent" },
      { label: "\\log", isKatex: true, template: "\\log(◻)", title: "Logarithm" },
      { label: "\\ln", isKatex: true, template: "\\ln(◻)", title: "Natural log" },
    ],
  },
  {
    name: "Layout",
    buttons: [
      { label: "\\begin{cases}", isKatex: false, template: "\\begin{cases} ◻ \\\\ ◻ \\end{cases}", title: "Cases / piecewise" },
      { label: "matrix", isKatex: false, template: "\\begin{pmatrix} ◻ & ◻ \\\\ ◻ & ◻ \\end{pmatrix}", title: "Matrix 2x2" },
      { label: "\\vec{v}", isKatex: true, template: "\\vec{◻}", title: "Vector" },
      { label: "\\hat{x}", isKatex: true, template: "\\hat{◻}", title: "Hat" },
      { label: "\\bar{x}", isKatex: true, template: "\\bar{◻}", title: "Bar" },
      { label: "\\dot{x}", isKatex: true, template: "\\dot{◻}", title: "Dot accent" },
    ],
  },
];

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = useMemo(() => getTheme(isDark), [isDark]);

  useEffect(() => {
    if (editingLatex === undefined) return;

    setLatex(editingLatex ?? "");
    setShowLibrary(false);
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

  /** Insert a LaTeX template at the cursor position in the textarea */
  const insertAtCursor = useCallback((template: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      // No textarea, just append
      setLatex((prev) => prev + template.replace(/◻/g, ""));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = latex.substring(start, end);

    // Replace first ◻ with selected text (if any), remove remaining ◻
    let insert = template;
    if (selected) {
      insert = insert.replace("◻", selected);
    }
    // Find position of first remaining ◻ for cursor placement
    const cursorPlaceholder = insert.indexOf("◻");
    insert = insert.replace(/◻/g, "");

    const newLatex = latex.substring(0, start) + insert + latex.substring(end);
    setLatex(newLatex);

    // Place cursor at the placeholder position
    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPos = cursorPlaceholder >= 0
        ? start + cursorPlaceholder
        : start + insert.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  }, [latex]);

  const handleInsert = useCallback(() => {
    if (!latex.trim() || validationError) return;
    const result = renderLatexToSvg(latex);
    onInsert(latex, result.svg, result.width, result.height);
    // Restore focus after insert or update
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  }, [latex, validationError, onInsert]);

  const handleExpressionClick = useCallback((entry: ExpressionEntry) => {
    setLatex(entry.latex);
    setShowLibrary(false);
  }, []);

  if (!visible) return null;

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: "9px 12px", border: "none", background: "none",
    cursor: "pointer", fontSize: 12, fontWeight: 500,
    color: active ? t.accent : t.textMuted,
    borderBottom: `2px solid ${active ? t.accent : "transparent"}`,
    transition: "all 0.15s",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", color: t.text }}>
      {/* Sub-tabs: Editor / Library */}
      <div style={{ display: "flex", borderBottom: `1px solid ${t.border}` }}>
        <button type="button" onClick={() => setShowLibrary(false)} style={tabStyle(!showLibrary)}>
          Editor
        </button>
        <button type="button" onClick={() => setShowLibrary(true)} style={tabStyle(showLibrary)}>
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
          flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column",
          gap: 8, overflowY: "auto",
        }}>
          {/* ── Visual Toolbar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {toolbarGroups.map((group) => (
              <div key={group.name}>
                <div style={{ fontSize: 10, color: t.textFaint, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {group.name}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {group.buttons.map((btn, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => insertAtCursor(btn.template)}
                      title={btn.title}
                      style={{
                        padding: "4px 7px",
                        border: `1px solid ${t.borderLight}`,
                        borderRadius: 4,
                        backgroundColor: t.bgElevated,
                        color: t.text,
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: btn.isKatex ? "inherit" : '"Fira Code", monospace',
                        minWidth: 28,
                        textAlign: "center",
                        transition: "border-color 0.15s",
                        lineHeight: 1.4,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.borderLight)}
                      dangerouslySetInnerHTML={
                        btn.isKatex
                          ? {
                              __html: katex.renderToString(btn.label, {
                                displayMode: false,
                                throwOnError: false,
                              }),
                            }
                          : undefined
                      }
                    >
                      {btn.isKatex ? undefined : btn.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── LaTeX Input ── */}
          <label style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            LaTeX
          </label>
          <textarea
            ref={textareaRef}
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            placeholder={'Type LaTeX or use the toolbar above'}
            style={{
              width: "100%", padding: "9px 11px", border: `1px solid ${t.border}`,
              boxSizing: "border-box", minWidth: 0,
              minHeight: 40,
              borderRadius: 6, fontFamily: '"Fira Code", "Cascadia Code", monospace',
              fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.5,
              backgroundColor: t.bgInput, color: t.text,
            }}
            rows={3}
            spellCheck={false}
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
