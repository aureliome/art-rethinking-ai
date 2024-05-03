import { OPENAI_MODEL, openaiFetcher } from "@/data/openai";
import useSWR from "swr";

export default function TaskGetImageDescription({
  imageUrl,
}: {
  imageUrl: string;
}) {
  const { data, error, isLoading, mutate } = useSWR(
    [
      "/chat/completions",
      {
        model: OPENAI_MODEL.GPT_4_TURBO,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Provide a detailed description of this image listing all objects and colors included in the image",
              },
              {
                type: "text",
                text: "Don't mention the artist and the name of the artwork. Don't use formatting (e.g. **Sky**) and new lines (\n) in the response.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  // TODO: make image detail customizable
                  detail: "low",
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      },
    ],
    openaiFetcher
  );

  return (
    <div>
      <p>Get description of the image {isLoading && <span>LOADING...</span>}</p>

      {error ? (
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
      ) : (
        <div>{JSON.stringify(data)}</div>
      )}
    </div>
  );
}
