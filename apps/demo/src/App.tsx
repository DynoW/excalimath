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
      if (elements) {
        const parsedElements = JSON.parse(elements);
        return {
          elements: Array.isArray(parsedElements) ? parsedElements : [],
        };
      }
    } catch (error) {
      console.error("Failed to restore Excalidraw data", error);
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
