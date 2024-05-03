import { useGetImageDescription } from "@/data/openai";
import { useState } from "react";

export default function TaskGetImageDescription({
  imageUrl,
  onSuccess,
}: {
  imageUrl: string;
  onSuccess: Function;
}) {
  const [imageDescription, setImageDescription] = useState<null | string>(null);
  const { data, error, isLoading, mutate } = useGetImageDescription({
    imageUrl,
    onSuccess: (imageDescription: string) => {
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

      {data && imageDescription && <p>{imageDescription}</p>}
    </div>
  );
}
