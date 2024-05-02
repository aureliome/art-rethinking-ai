"use client";

import paintings from "@/data/paintings/paintings";
import style from "./page.module.css";

export default function Home() {
  function printPaintingData(index: number) {
    console.log(paintings[index]);
  }

  return (
    <main>
      <h1>Art Rethinking AI</h1>

      <h2>Step 1: select an artwork</h2>
      <p>
        Click on one of the following artwork you want to <i>rethink</i>
      </p>

      {paintings.map((painting, index) => (
        <div
          className={style.painting}
          onClick={() => printPaintingData(index)}
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
      ))}
    </main>
  );
}
