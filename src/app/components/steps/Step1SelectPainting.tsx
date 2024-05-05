import paintings from "@/data/paintings/paintings";
import PaintingItem from "@/app/components/PaintingItem";

export default function Step1SelectPainting({
  onSuccess,
}: {
  onSuccess: (painting: Painting) => void;
}) {
  return (
    <div>
      <h2>Step 1: select a painting</h2>
      <p>
        Click on one of the following paintings you want to <i>rethink</i>
      </p>

      {paintings.map((painting) => (
        <PaintingItem
          key={painting.id}
          painting={painting}
          onSelectPainting={onSuccess}
        />
      ))}
    </div>
  );
}
