import useSWR from "swr";
import {
  OPENAI_MODEL,
  OPENAI_DALL_E_SIZES,
  GetDescriptionImageDetail,
} from "../../types/openai";

const ENDPOINT = "https://api.openai.com/v1";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  "Content-Type": "application/json",
};

// TODO: replace "Record<string, unknown>" with a type
const openaiFetcher = (url: string, body: Record<string, unknown>) =>
  fetch(`${ENDPOINT}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }).then((res) => res.json());

const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  shouldRetryOnError: false,
  refreshInterval: 0,
};

export function useGetImageDescription({
  imageUrl,
  imageDetail,
  maxTokens,
  onSuccess,
}: {
  imageUrl: string;
  imageDetail: GetDescriptionImageDetail;
  maxTokens: number;
  onSuccess: (request: string, imageDescription: string) => void;
}) {
  const requestMessages = [
    "Provide a detailed description of this image listing all objects and colors included in the image.",
    "Don't mention the artist and the name of the artwork. Don't use formatting (e.g. **Sky**) and new lines (/\n) in the response.",
  ];
  const { data, error, isLoading, mutate } = useSWR(
    ["/chat/completions", imageUrl],
    ([url, imageUrl]: [string, string]) =>
      openaiFetcher(url, {
        model: OPENAI_MODEL.GPT_4_TURBO,
        messages: [
          {
            role: "user",
            content: [
              ...requestMessages.map((message) => ({
                type: "text",
                text: message,
              })),
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: imageDetail,
                },
              },
            ],
          },
        ],
        max_tokens: maxTokens,
      }),
    {
      ...swrOptions,
      onSuccess: (data, key, config) => {
        const request = requestMessages.join("\n");
        const imageDescription = data.choices[0].message.content;
        onSuccess(request, imageDescription);
      },
    }
  );

  return { data, isLoading, error, mutate };
}

export function useGenerateImage({
  imageUrl,
  imageDescription,
  genres,
  styles,
  media,
  size,
  imagePrefixAsIs,
  imagePaintingDetails,
  onSuccess,
}: {
  imageUrl: string;
  imageDescription: string;
  genres: string[];
  styles: string[];
  media: string[];
  size: "SQUARE" | "HORIZONTAL" | "VERTICAL";
  imagePrefixAsIs: boolean;
  imagePaintingDetails: boolean;
  onSuccess: (request: string, newImageUrl: string) => void;
}) {
  let prompt = "";
  if (imagePrefixAsIs) {
    prompt += `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS. `;
  }
  prompt += `Create a painting `;
  if (
    imagePaintingDetails &&
    (genres.length || styles.length || media.length)
  ) {
    if (genres.length) {
      prompt += `of genres "${genres.join(",")}", `;
    }
    if (styles.length) {
      prompt += `with styles "${styles.join(",")}", `;
    }
    if (media.length) {
      prompt += `on media "${media.join(",")}", `;
    }
  }
  prompt += `using the following description: "${imageDescription}".`;

  const { data, error, isLoading, mutate } = useSWR(
    ["/images/generations", imageUrl],
    ([url, _imageUrl]: [string, string]) =>
      openaiFetcher(url, {
        model: OPENAI_MODEL.DALL_E_3,
        prompt,
        n: 1,
        size: OPENAI_DALL_E_SIZES[size],
      }),
    {
      ...swrOptions,
      onSuccess: (data, key, config) => {
        const request = prompt;
        const newImageUrl = data.data[0].url;
        onSuccess(request, newImageUrl);
      },
    }
  );

  return { data, isLoading, error, mutate };
}
