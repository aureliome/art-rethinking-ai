import { useState } from "react";
import { useGenerateImage } from "@/data/openai";
import StepAsyncContent from "../molecules/StepAsyncContent";
import Step from "../molecules/Step";
import StepRequestResponse from "../molecules/StepRequestResponse";

export default function Step4GenerateImage({
  collapsed,
  paiting,
  imageDescription,
  imagePrefixAsIs,
  imagePaintingDetails,
  onSuccess,
}: {
  collapsed: boolean;
  paiting: Painting;
  imageDescription: string;
  imagePrefixAsIs: boolean;
  imagePaintingDetails: boolean;
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
    imageDescription,
    genres: paiting.genres,
    styles: paiting.styles,
    media: paiting.media,
    size,
    imagePrefixAsIs,
    imagePaintingDetails,
    onSuccess: (request: string, newImageUrl: string) => {
      setRequest(request);
      setNewImageUrl(newImageUrl);
      onSuccess(newImageUrl);
    },
  });

  return (
    <Step title="Generate a new image" collapsed={collapsed}>
      <StepAsyncContent
        data={data}
        error={error}
        isLoading={isLoading}
        onRetry={mutate}
      >
        <StepRequestResponse
          request={<p>{request}</p>}
          response={
            newImageUrl && <img className="responsive-img" src={newImageUrl} />
          }
        />
      </StepAsyncContent>
    </Step>
  );
}
