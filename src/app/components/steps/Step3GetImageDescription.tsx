import { useState } from "react";
import { useGetImageDescription } from "@/data/openai";
import StepDetail from "../molecules/StepDetail";
import StepTitle from "../molecules/StepTitle";

export default function Step3GetImageDescription({
  imageUrl,
  onSuccess,
}: {
  imageUrl: string;
  onSuccess: (imageDescription: string) => void;
}) {
  const [imageDescription, setImageDescription] = useState<null | string>(null);
  const [request, setRequest] = useState<null | string>(null);

  const { data, error, isLoading, mutate } = useGetImageDescription({
    imageUrl,
    onSuccess: (request: string, imageDescription: string) => {
      setRequest(request);
      setImageDescription(imageDescription);
      onSuccess(imageDescription);
    },
  });

  return (
    <div>
      <StepTitle
        title="Get description of the original image"
        data={data}
        error={error}
        isLoading={isLoading}
        onRetry={mutate}
      />

      {data && request && imageDescription && (
        <StepDetail
          request={
            <div>
              <p>{request}</p>
              <img className="responsive-img" src={imageUrl} />
            </div>
          }
          response={<p>{imageDescription}</p>}
        />
      )}
    </div>
  );
}
