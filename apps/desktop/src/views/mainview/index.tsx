/**
 * ExcaliMath Desktop — renderer entry point.
 * Full React app with Excalidraw + ExcaliMath plugin.
 */

import { StrictMode, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcaliMath } from "@excalimath/core";
import type { ExcalimathSceneData } from "@excalimath/core";

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  const handleSave = useCallback((data: ExcalimathSceneData) => {
    console.log("[ExcaliMath Desktop] Scene updated:", data.elements.length, "elements");
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Excalidraw
        excalidrawAPI={setExcalidrawAPI}
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
