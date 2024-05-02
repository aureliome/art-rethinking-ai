import style from "./PaintingItem.module.css";

export default function PaintingItem({
  painting,
  onSelectPainting,
}: {
  painting: Painting;
  onSelectPainting?: Function;
}) {
  return (
    <div
      className={style.painting}
      onClick={() => (onSelectPainting ? onSelectPainting(painting) : null)}
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
  );
}
