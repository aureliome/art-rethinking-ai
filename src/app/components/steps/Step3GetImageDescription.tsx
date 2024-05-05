import { useState } from "react";
import { useGetImageDescription } from "@/data/openai";

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
      <p>Get description of the image {isLoading && <span>LOADING...</span>}</p>

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
        <div>
          <div>
            <h3>REQUEST</h3>
            <p>{request}</p>
            <img src={imageUrl} width="100" />
          </div>
          <div>
            <h3>RESPONSE</h3>
            <p>{imageDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}
