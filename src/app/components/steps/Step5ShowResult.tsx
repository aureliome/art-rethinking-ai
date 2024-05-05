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
      <div>
        <div>
          <h3>ORIGINAL IMAGE</h3>
          <img src={originalImageUrl} width="300" />
        </div>
        <div>
          <h3>NEW IMAGE</h3>
          <img src={newImageUrl} width="300" />
        </div>
      </div>
      <button
        onClick={() => {
          onRetry();
        }}
      >
        CREATE A NEW IMAGE
      </button>
    </div>
  );
}
