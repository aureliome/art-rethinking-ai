"use client";

import { useState } from "react";
import paintings from "@/data/paintings/paintings";
import PaintingItem from "./components/PaintingItem";
import TaskGetImageDescription from "./components/TaskGetImageDescription";

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [selectedPainting, setSelectedPaiting] = useState<null | Painting>(
    null
  );
  const [imageDescription, setImageDescription] = useState<null | any>(null);

  function selectPainting(painting: Painting) {
    setSelectedPaiting(painting);
    setStep(1);
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

      {step > 0 && selectedPainting && (
        <TaskGetImageDescription imageUrl={selectedPainting.image} />
      )}
    </main>
  );
}
