import style from "./PaintingItem.module.css";

export default function PaintingItem({
  painting,
  onSelectPainting,
}: {
  painting: Painting;
  onSelectPainting?: (painting: Painting) => void;
}) {
  return (
    <div
      className="card hoverable"
      onClick={() => (onSelectPainting ? onSelectPainting(painting) : null)}
      key={painting.id}
    >
      <div className="card-image">
        <img src={painting.image} alt={painting.title} />
      </div>
      <div className="card-content">
        <p>
          <strong>{painting.title}</strong>
        </p>
        <p>
          <i>
            {painting.artistName}, {painting.completitionYear}
          </i>
        </p>
      </div>
    </div>
  );
}
