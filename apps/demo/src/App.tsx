import { useState, useCallback, useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcaliMath } from "@excalimath/core";
import type { ExcalimathSceneData } from "@excalimath/core";

export function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const timeoutId = useRef<any>(null);

  const [initialData] = useState(() => {
    try {
      const elements = localStorage.getItem("excalidraw-elements");
      const appState = localStorage.getItem("excalidraw-appState");
      if (elements) {
        return {
          elements: JSON.parse(elements),
          appState: appState ? JSON.parse(appState) : undefined,
        };
      }
    } catch (error) {
      console.error("Failed to restore Excalidraw data", error);
    }
    return null;
  });

  const handleExcalidrawAPI = useCallback((api: any) => {
    setExcalidrawAPI(api);
  }, []);

  const handleChange = useCallback((elements: readonly any[], appState: any) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      try {
        localStorage.setItem("excalidraw-elements", JSON.stringify(elements));
        localStorage.setItem("excalidraw-appState", JSON.stringify(appState));
      } catch (error) {
        console.error("Failed to save Excalidraw data", error);
      }
    }, 1000); // 1-second debounce to match typical auto-save behavior
  }, []);

  const handleSave = useCallback((data: ExcalimathSceneData) => {
    // In a real app, persist this to localStorage, a server, etc.
    console.log("[ExcaliMath] Scene saved:", data.elements.length, "elements");
  }, []);

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
              onSave={handleSave}
            />
          ) : null
        }
      />
    </div>
  );
}
