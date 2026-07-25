/**
 * @module theme
 *
 * Theme tokens for ExcaliMath panels. Reads Excalidraw's current theme
 * (light/dark) and provides matching colour values for all UI components.
 */

export interface ThemeTokens {
  // Surface
  bg: string;
  bgElevated: string;
  bgHover: string;
  bgInput: string;
  border: string;
  borderLight: string;

  // Text
  text: string;
  textMuted: string;
  textFaint: string;

  // Accent
  accent: string;
  accentText: string;
  accentMuted: string;

  // Status
  error: string;
  errorBg: string;

  // Shadows
  shadow: string;
}

const lightTokens: ThemeTokens = {
  bg: "#ffffff",
  bgElevated: "#f8f9fa",
  bgHover: "#f1f3f5",
  bgInput: "#ffffff",
  border: "#dee2e6",
  borderLight: "#e9ecef",

  text: "#1e1e1e",
  textMuted: "#666",
  textFaint: "#999",

  accent: "#6965db",
  accentText: "#ffffff",
  accentMuted: "rgba(105,101,219,0.1)",

  error: "#cc0000",
  errorBg: "#fff0f0",

  shadow: "rgba(0,0,0,0.08)",
};

const darkTokens: ThemeTokens = {
  bg: "#232329",
  bgElevated: "#2c2c35",
  bgHover: "#363640",
  bgInput: "#1e1e24",
  border: "#3d3d4a",
  borderLight: "#333340",

  text: "#e2e2e8",
  textMuted: "#a0a0b0",
  textFaint: "#6c6c80",

  accent: "#7b78ee",
  accentText: "#ffffff",
  accentMuted: "rgba(123,120,238,0.15)",

  error: "#ff6b6b",
  errorBg: "rgba(255,50,50,0.1)",

  shadow: "rgba(0,0,0,0.3)",
};

/** Get theme tokens based on Excalidraw's appState theme */
export function getTheme(isDark: boolean): ThemeTokens {
  return isDark ? darkTokens : lightTokens;
}
