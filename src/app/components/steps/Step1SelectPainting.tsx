import paintings from "@/data/paintings/paintings";
import PaintingItem from "@/app/components/PaintingItem";
import style from "./Step1SelectPainting.module.css";

export default function Step1SelectPainting({
  onSuccess,
}: {
  onSuccess: (painting: Painting) => void;
}) {
  return (
    <div>
      <h5>Step 1: select a painting</h5>
      <p>
        Click on one of the following paintings you want to <i>rethink</i>
      </p>

      <div className={style.masonry}>
        {paintings.map((painting) => (
          <PaintingItem
            key={painting.id}
            painting={painting}
            onSelectPainting={onSuccess}
          />
        ))}
      </div>
    </div>
  );
}
