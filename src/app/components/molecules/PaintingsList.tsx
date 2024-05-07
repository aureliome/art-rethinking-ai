import PaintingItem from "./PaintingItem";
import style from "./PaintingsList.module.css";

export default function PaintingsList({
  paintings,
  onSelectPainting,
}: {
  paintings: Painting[];
  onSelectPainting: (painting: Painting) => void;
}) {
  return (
    <div className={style.masonry}>
      {paintings.map((painting) => (
        <PaintingItem
          key={painting.id}
          painting={painting}
          onSelectPainting={onSelectPainting}
        />
      ))}
    </div>
  );
}
