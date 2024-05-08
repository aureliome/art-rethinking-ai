import { useState } from "react";
import { useGetImageDescription } from "@/data/openai";
import Step from "../molecules/Step";
import StepAsyncContent from "../molecules/StepAsyncContent";
import StepRequestResponse from "../molecules/StepRequestResponse";
import { GetDescriptionImageDetail } from "../../../../types/openai";

export default function Step3GetImageDescription({
  collapsed,
  imageUrl,
  imageDetail,
  maxTokens,
  onSuccess,
}: {
  collapsed: boolean;
  imageUrl: string;
  imageDetail: GetDescriptionImageDetail;
  maxTokens: number;
  onSuccess: (imageDescription: string) => void;
}) {
  const [imageDescription, setImageDescription] = useState<null | string>(null);
  const [request, setRequest] = useState<null | string>(null);

  const { data, error, isLoading, mutate } = useGetImageDescription({
    imageUrl,
    imageDetail,
    maxTokens,
    onSuccess: (request: string, imageDescription: string) => {
      setRequest(request);
      setImageDescription(imageDescription);
      onSuccess(imageDescription);
    },
  });

  return (
    <Step title="Get a description of the artwork" collapsed={collapsed}>
      <StepAsyncContent
        data={data}
        error={error}
        isLoading={isLoading}
        onRetry={mutate}
      >
        <StepRequestResponse
          request={
            <div>
              <p>{request}</p>
              <img
                className="responsive-img"
                src={imageUrl}
                alt="Original painting"
              />
            </div>
          }
          response={<p>{imageDescription}</p>}
        />
      </StepAsyncContent>
    </Step>
  );
}
