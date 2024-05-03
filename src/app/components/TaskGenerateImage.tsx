import { useGenerateImage } from "@/data/openai";
import { useState } from "react";

export default function TaskGenerateImage({
  originalImage,
  originalImageDescription,
  onSuccess,
}: {
  originalImage: Painting;
  originalImageDescription: string;
  onSuccess: Function;
}) {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<null | string>(
    null
  );
  const size =
    originalImage.width === originalImage.height
      ? "SQUARE"
      : originalImage.width > originalImage.height
      ? "HORIZONTAL"
      : "VERTICAL";

  const { data, error, isLoading, mutate } = useGenerateImage({
    imageUrl: originalImage.image,
    imageDescription: originalImageDescription,
    genres: originalImage.genres,
    styles: originalImage.styles,
    media: originalImage.media,
    size,
    onSuccess: (generatedImageUrl: string) => {
      setGeneratedImageUrl(generatedImageUrl);
      onSuccess(generatedImageUrl);
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

      {data && generatedImageUrl && (
        <div>
          <img width={400} src={generatedImageUrl} />
        </div>
      )}
    </div>
  );
}
