"use client";

import { useEffect, useState } from "react";
import paintings from "@/data/paintings/paintings";
import {
  getDescriptionFromAnImage,
  generateImageFromPrompt,
} from "@/data/openai";
import PaintingItem from "./components/PaintingItem";

export default function Home() {
  const [selectedPainting, setSelectedPaiting] = useState<null | Painting>(
    null
  );
  const [imageDescription, setImageDescription] = useState<null | any>(null);

  function selectPainting(painting: Painting) {
    setSelectedPaiting(painting);
  }

  useEffect(() => {
    const fetchImageDescription = async (imageUrl: string) => {
      const data = await getDescriptionFromAnImage({
        imageUrl,
      });
      const json = await data.json();
      console.log(json);
      setImageDescription(json);
    };

    console.log("useEffect - selectedPaiting", selectedPainting);
    if (selectedPainting) {
      fetchImageDescription(selectedPainting.image);
    }
  }, [selectedPainting]);

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

      {imageDescription && <p>{JSON.stringify(imageDescription)}</p>}
    </main>
  );
}
