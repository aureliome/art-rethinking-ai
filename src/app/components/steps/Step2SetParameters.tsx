export default function Step2SelectParameters({
  painting,
  onSuccess,
  onGoBack,
}: {
  painting: Painting;
  onSuccess: () => void;
  onGoBack: () => void;
}) {
  return (
    <div>
      <div className="row">
        <div className="col s12 m5">
          <img
            className="responsive-img"
            src={painting.image}
            alt={painting.title}
          />
        </div>
        <div className="col s12 m7">
          <p>
            <strong>Title: </strong>
            {painting.title}
          </p>
          <p>
            <strong>Artist: </strong>
            {painting.artistName}
          </p>

          {painting.genres.length > 0 && (
            <p>
              <strong>Genres: </strong>
              {painting.genres.length === 1
                ? painting.genres.join(", ")
                : painting.genres.join(", ").slice(0, -2)}
            </p>
          )}

          {painting.styles.length > 0 && (
            <p>
              <strong>Styles: </strong>
              {painting.styles.length === 1
                ? painting.styles.join(", ")
                : painting.styles.join(", ").slice(0, -2)}
            </p>
          )}

          {painting.media.length > 0 && (
            <p>
              <strong>Media: </strong>
              {painting.media.length === 1
                ? painting.media.join(", ")
                : painting.media.join(", ").slice(0, -2)}
            </p>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col s6 right-align">
          <button
            className="btn-large black-text white"
            onClick={() => {
              onGoBack();
            }}
          >
            GO BACK
          </button>
        </div>
        <div className="col s6 left-align">
          <button
            className="btn-large"
            onClick={() => {
              onSuccess();
            }}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}
