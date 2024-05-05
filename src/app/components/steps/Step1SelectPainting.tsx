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
      <p>
        <strong>
          Click on one of the following paintings you want to <i>rethink</i>
        </strong>
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
