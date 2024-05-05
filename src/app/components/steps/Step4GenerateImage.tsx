import { useState } from "react";
import { useGenerateImage } from "@/data/openai";
import Title from "@/app/components/atoms/Title";
import StepDetail from "../molecules/StepDetail";

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
      <Title>Generate a new image {isLoading && <span>LOADING...</span>}</Title>

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
        <StepDetail
          request={<p>{request}</p>}
          response={<img className="responsive-img" src={newImageUrl} />}
        />
      )}
    </div>
  );
}
