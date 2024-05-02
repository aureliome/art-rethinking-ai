"use client";

import { useState } from "react";
import paintings from "@/data/paintings/paintings";
import style from "./page.module.css";

export default function Home() {
  const [selectedPainting, setSelectedPaiting] = useState<null | Painting>(
    null
  );

  function selectPainting(index: number) {
    setSelectedPaiting(paintings[index]);
  }

  return (
    <main>
      <h1>Art Rethinking AI</h1>

      <h2>Step 1: select an artwork</h2>
      <p>
        Click on one of the following artwork you want to <i>rethink</i>
      </p>

      {selectedPainting ? (
        <p>{selectedPainting.title}</p>
      ) : (
        paintings.map((painting, index) => (
          <div
            className={style.painting}
            onClick={() => selectPainting(index)}
            key={painting.id}
          >
            <img src={painting.image} alt={painting.title} height="100" />
            <div>
              <p>
                <strong>{painting.title}</strong>
              </p>
              <p>
                <i>{painting.artistName}</i>
              </p>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
