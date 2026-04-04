import { useState, useCallback } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcaliMath } from "@excalimath/core";
import type { ExcalimathSceneData } from "@excalimath/core";

export function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  const handleExcalidrawAPI = useCallback((api: any) => {
    setExcalidrawAPI(api);
  }, []);

  const handleSave = useCallback((data: ExcalimathSceneData) => {
    // In a real app, persist this to localStorage, a server, etc.
    console.log("[ExcaliMath] Scene saved:", data.elements.length, "elements");
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Excalidraw
        excalidrawAPI={handleExcalidrawAPI}
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
