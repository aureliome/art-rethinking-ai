import Title from "../atoms/Title";

export default function Step5ShowResult({
  originalImageUrl,
  newImageUrl,
  onRetry,
}: {
  originalImageUrl: string;
  newImageUrl: string;
  onRetry: () => void;
}) {
  return (
    <div>
      <div className="row">
        <div className="col s12 m6 center-align">
          <Title>Original Image</Title>
          <img className="responsive-img" src={originalImageUrl} />
        </div>
        <div className="col s12 m6 center-align">
          <Title>New Image</Title>
          <img className="responsive-img" src={newImageUrl} />
        </div>
        <div className="col s12 center-align">
          <button
            className="btn-large"
            onClick={() => {
              onRetry();
            }}
          >
            CREATE A NEW IMAGE
          </button>
        </div>
      </div>
    </div>
  );
}
