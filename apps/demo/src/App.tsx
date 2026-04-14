import { useState, useCallback } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcaliMath } from "@excalimath/core";

export function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [lastSavedTheme, setLastSavedTheme] = useState<string | null>(() => {
    return localStorage.getItem("excalimath-theme");
  });

  const [initialData] = useState(() => {
    try {
      const elements = localStorage.getItem("excalidraw-elements");
      const savedTheme = localStorage.getItem("excalimath-theme");
      
      const parsedElements = elements ? JSON.parse(elements) : [];
      const initialElements = Array.isArray(parsedElements) ? parsedElements : [];
      
      return {
        elements: initialElements,
        appState: savedTheme ? { theme: savedTheme as "light" | "dark" } : undefined,
      };
    } catch (error) {
      console.error("Failed to restore initial data", error);
    }
    return undefined;
  });

  const handleExcalidrawAPI = useCallback((api: any) => {
    setExcalidrawAPI(api);
  }, []);

  const handleChange = useCallback((elements: readonly any[], appState: any) => {
    try {
      localStorage.setItem("excalidraw-elements", JSON.stringify(elements));
    } catch (error) {
      console.error("Failed to save Excalidraw data", error);
    }

    // Detect theme changes from appState
    const currentTheme = appState?.theme;
    if (currentTheme && currentTheme !== lastSavedTheme) {
      try {
        localStorage.setItem("excalimath-theme", currentTheme);
        setLastSavedTheme(currentTheme);
        
        // Apply theme class to html
        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Failed to save theme preference", error);
      }
    }
  }, [lastSavedTheme]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Excalidraw
        excalidrawAPI={handleExcalidrawAPI}
        initialData={initialData}
        onChange={handleChange}
        renderTopRightUI={() =>
          excalidrawAPI ? (
            <ExcaliMath
              excalidrawAPI={excalidrawAPI}
              enabledPlugins={["equation", "graph", "library"]}
              theme="auto"
            />
          ) : null
        }
      />
    </div>
  );
}
