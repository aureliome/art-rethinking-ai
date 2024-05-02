"use client";

import { useState } from "react";
import paintings from "@/data/paintings/paintings";
import PaintingItem from "./components/PaintingItem";

export default function Home() {
  const [selectedPainting, setSelectedPaiting] = useState<null | Painting>(
    null
  );

  function selectPainting(painting: Painting) {
    setSelectedPaiting(painting);
  }

  return (
    <main>
      <h1>Art Rethinking AI</h1>

      <h2>Step 1: select an artwork</h2>
      <p>
        Click on one of the following artwork you want to <i>rethink</i>
      </p>

      {selectedPainting ? (
        <PaintingItem painting={selectedPainting} />
      ) : (
        paintings.map((painting) => (
          <PaintingItem
            key={painting.id}
            painting={painting}
            onSelectPainting={selectPainting}
          />
        ))
      )}
    </main>
  );
}
