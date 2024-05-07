import paintings from "@/data/paitining.json";
import PaintingItem from "@/app/components/molecules/PaintingItem";
import Step from "../molecules/Step";
import PaintingsList from "../molecules/PaintingsList";

export default function Step1SelectPainting({
  selectedPaiting,
  collapsed,
  onSuccess,
}: {
  selectedPaiting: Painting | null;
  collapsed: boolean;
  onSuccess: (painting: Painting) => void;
}) {
  return (
    <Step title="Choose the artwork" collapsed={collapsed}>
      {selectedPaiting ? (
        <div className="row">
          <div className="col s12 m5">
            <img
              className="responsive-img"
              src={selectedPaiting.image}
              alt={selectedPaiting.title}
            />
          </div>
          <div className="col s12 m7">
            <p>
              <strong>Title: </strong>
              {selectedPaiting.title}
            </p>
            <p>
              <strong>Artist: </strong>
              {selectedPaiting.artistName}
            </p>

            {selectedPaiting.genres.length > 0 && (
              <p>
                <strong>Genres: </strong>
                {selectedPaiting.genres.length === 1
                  ? selectedPaiting.genres.join(", ")
                  : selectedPaiting.genres.join(", ").slice(0, -2)}
              </p>
            )}

            {selectedPaiting.styles.length > 0 && (
              <p>
                <strong>Styles: </strong>
                {selectedPaiting.styles.length === 1
                  ? selectedPaiting.styles.join(", ")
                  : selectedPaiting.styles.join(", ").slice(0, -2)}
              </p>
            )}

            {selectedPaiting.media.length > 0 && (
              <p>
                <strong>Media: </strong>
                {selectedPaiting.media.length === 1
                  ? selectedPaiting.media.join(", ")
                  : selectedPaiting.media.join(", ").slice(0, -2)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <PaintingsList paintings={paintings} onSelectPainting={onSuccess} />
      )}
    </Step>
  );
}
