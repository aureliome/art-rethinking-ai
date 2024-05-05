import { useGenerateImage } from "@/data/openai";
import { useState } from "react";

export default function Step4GenerateImage({
  paiting,
  imageDescription,
  onSuccess,
}: {
  paiting: Painting;
  imageDescription: string;
  onSuccess: (newImageUrl: string) => void;
}) {
  const [newImageUrl, setNewImageUrl] = useState<null | string>(null);
  const [request, setRequest] = useState<null | string>(null);

  const size =
    paiting.width === paiting.height
      ? "SQUARE"
      : paiting.width > paiting.height
      ? "HORIZONTAL"
      : "VERTICAL";

  const { data, error, isLoading, mutate } = useGenerateImage({
    imageUrl: paiting.image,
    imageDescription: imageDescription,
    genres: paiting.genres,
    styles: paiting.styles,
    media: paiting.media,
    size,
    onSuccess: (request: string, newImageUrl: string) => {
      setRequest(request);
      setNewImageUrl(newImageUrl);
      onSuccess(newImageUrl);
    },
  });

  return (
    <div>
      <p>Generate a new image {isLoading && <span>LOADING...</span>}</p>

      {error && (
        <div>
          ERROR!{" "}
          <button
            onClick={() => {
              mutate();
            }}
          >
            RETRY
          </button>
        </div>
      )}

      {data && newImageUrl && (
        <div>
          <div>
            <h3>REQUEST</h3>
            <p>{request}</p>
          </div>
          <div>
            <h3>RESPONSE</h3>
            <img src={newImageUrl} width="100" />
          </div>
        </div>
      )}
    </div>
  );
}
