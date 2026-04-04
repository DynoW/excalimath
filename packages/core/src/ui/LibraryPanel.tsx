/**
 * @module LibraryPanel
 *
 * Shape library browser with search, pack filtering, toggle controls,
 * and custom .excalidrawlib import. Embedded inside the ExcaliMath sidebar.
 */

import { useState, useCallback, useMemo, useRef } from "react";
import {
  builtInPacks,
  searchShapes,
  parseExcalidrawLib,
  type LibraryPack,
  type LibraryShape,
} from "../plugins/geometry";
import { getTheme } from "./theme";

export interface LibraryPanelProps {
  onInsert: (shape: LibraryShape) => void;
  onClose: () => void;
  visible: boolean;
  isDark?: boolean;
}

export function LibraryPanel({ onInsert, onClose, visible, isDark = false }: LibraryPanelProps) {
  const [packs, setPacks] = useState<LibraryPack[]>(() =>
    builtInPacks.map((p) => ({ ...p }))
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPack, setSelectedPack] = useState("");
  const [showToggles, setShowToggles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useMemo(() => getTheme(isDark), [isDark]);

  const togglePack = useCallback((packName: string) => {
    setPacks((prev) =>
      prev.map((p) => (p.name === packName ? { ...p, enabled: !p.enabled } : p))
    );
  }, []);

  const filteredShapes = useMemo(() => {
    if (searchTerm) return searchShapes(packs, searchTerm);
    if (selectedPack) {
      const pack = packs.find((p) => p.name === selectedPack);
      if (pack?.enabled) return pack.shapes.map((shape) => ({ pack: pack.name, shape }));
      return [];
    }
    const results: Array<{ pack: string; shape: LibraryShape }> = [];
    for (const pack of packs) {
      if (!pack.enabled) continue;
      for (const shape of pack.shapes) results.push({ pack: pack.name, shape });
    }
    return results;
  }, [packs, searchTerm, selectedPack]);

  const handleImportFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const name = file.name.replace(/\.excalidrawlib$/, "");
        const imported = parseExcalidrawLib(text, name);
        setPacks((prev) => [...prev, imported]);
        setSelectedPack(imported.name);
      } catch (err) {
        alert(`Failed to import: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, []
  );

  const totalShapes = packs.filter((p) => p.enabled).reduce((sum, p) => sum + p.shapes.length, 0);

  if (!visible) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", color: t.text }}>
      {/* Search + filter */}
      <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderBottom: `1px solid ${t.borderLight}` }}>
        <input
          type="text"
          placeholder={`Search ${totalShapes} shapes...`}
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); if (e.target.value) setSelectedPack(""); }}
          style={{
            flex: 1, padding: "7px 10px", border: `1px solid ${t.border}`,
            borderRadius: 6, fontSize: 12, outline: "none",
            backgroundColor: t.bgInput, color: t.text,
          }}
        />
        <select
          aria-label="Filter by pack"
          value={selectedPack}
          onChange={(e) => { setSelectedPack(e.target.value); setSearchTerm(""); }}
          style={{
            padding: "7px 8px", border: `1px solid ${t.border}`,
            borderRadius: 6, fontSize: 11, outline: "none",
            backgroundColor: t.bgInput, color: t.text, maxWidth: 120,
          }}
        >
          <option value="">All Packs</option>
          {packs.map((p) => (
            <option key={p.name} value={p.name} disabled={!p.enabled}>
              {p.name} ({p.shapes.length})
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowToggles(!showToggles)}
          title="Toggle packs"
          style={{
            width: 32, height: 32, border: `1px solid ${t.border}`, borderRadius: 6,
            backgroundColor: showToggles ? t.accentMuted : t.bgInput,
            color: showToggles ? t.accent : t.textMuted,
            cursor: "pointer", fontSize: 14, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}
        >
          ⚙
        </button>
      </div>

      {/* Pack toggles (collapsible) */}
      {showToggles && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 4, padding: "8px 14px",
          borderBottom: `1px solid ${t.borderLight}`, backgroundColor: t.bgElevated,
        }}>
          {packs.map((pack) => (
            <label key={pack.name} style={{
              display: "flex", alignItems: "center", gap: 4, padding: "3px 8px",
              borderRadius: 4, fontSize: 11, cursor: "pointer",
              backgroundColor: pack.enabled ? t.accentMuted : "transparent",
              color: pack.enabled ? t.accent : t.textFaint,
              transition: "all 0.15s",
            }}>
              <input type="checkbox" checked={pack.enabled} onChange={() => togglePack(pack.name)}
                style={{ width: 12, height: 12 }} />
              <span style={{ fontWeight: 500 }}>{pack.name}</span>
            </label>
          ))}
        </div>
      )}

      {/* Shape grid */}
      <div style={{
        flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 5, padding: "10px 12px", overflowY: "auto", alignContent: "start",
      }}>
        {filteredShapes.map(({ pack, shape }, i) => (
          <button
            type="button"
            key={`${pack}-${shape.name}-${i}`}
            onClick={() => onInsert(shape)}
            title={`${shape.name} (${pack})`}
            style={{
              display: "flex", flexDirection: "column", gap: 2, padding: "10px 8px",
              border: `1px solid ${t.borderLight}`, borderRadius: 6,
              background: t.bgElevated, cursor: "pointer", textAlign: "left",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.borderLight)}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: t.text, lineHeight: 1.3 }}>{shape.name}</span>
            <span style={{ fontSize: 9, color: t.textFaint }}>{pack}</span>
          </button>
        ))}
        {filteredShapes.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 24, fontSize: 12, color: t.textFaint }}>
            {searchTerm ? "No shapes match your search." : "No packs enabled."}
          </div>
        )}

        {/* Import button — flows inside the grid */}
        <div style={{ gridColumn: "1 / -1", marginTop: 4 }}>
          <input ref={fileInputRef} type="file" accept=".excalidrawlib" onChange={handleImportFile} aria-label="Import library file" style={{ display: "none" }} />
          <button type="button" onClick={() => fileInputRef.current?.click()}
            style={{
              width: "100%", padding: "8px 12px", border: `1px dashed ${t.border}`, borderRadius: 6,
              background: "none", cursor: "pointer", fontSize: 12, color: t.accent, fontWeight: 500,
            }}>
            Import .excalidrawlib
          </button>
        </div>
      </div>
    </div>
  );
}
