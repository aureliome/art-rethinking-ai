import { useState } from "react";
import { useGetImageDescription } from "@/data/openai";
import Title from "@/app/components/atoms/Title";
import StepDetail from "../molecules/StepDetail";

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
      <Title>
        Get description of the image {isLoading && <span>LOADING...</span>}
      </Title>

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
