import Title from "../atoms/Title";
import Step from "../molecules/Step";

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
    <Step title="Final Result" collapsed={false}>
      <div>
        <div className="row">
          <div className="col s12 m6">
            <h6>ORIGINAL IMAGE</h6>
            <img className="responsive-img" src={originalImageUrl} />
          </div>
          <div className="col s12 m6">
            <h6>NEW IMAGE</h6>
            <img className="responsive-img" src={newImageUrl} />
          </div>
        </div>
        <div className="row">
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
    </Step>
  );
}
