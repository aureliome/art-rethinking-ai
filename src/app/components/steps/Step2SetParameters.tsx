export default function Step2SelectParameters({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return (
    <div>
      <button
        onClick={() => {
          onSuccess();
        }}
      >
        START
      </button>
    </div>
  );
}
