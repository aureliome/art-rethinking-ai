const ENDPOINT = "https://api.openai.com/v1";

export enum OPENAI_MODEL {
  GPT_4_TURBO = "gpt-4-turbo",
  DALL_E_2 = "dall-e-2",
  DALL_E_3 = "dall-e-3",
}

enum OPENAI_DALL_E_SIZES {
  "SQUARE" = "1024x1024",
  "VERTICAL" = "1024x1792",
  "HORIZONTAL" = "1792x1024",
}

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  "Content-Type": "application/json",
};

// TODO: replace "Record<string, unknown>" with a type
export const openaiFetcher = ([url, body]: [string, Record<string, unknown>]) =>
  fetch(`${ENDPOINT}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }).then((res) => res.json());

const generateImageFromPrompt = ({
  description,
  genres,
  styles,
  media,
  size,
}: {
  description: string;
  genres: string[];
  styles: string[];
  media: string[];
  size: "SQUARE" | "HORIZONTAL" | "VERTICAL";
}) => {
  let prompt = `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS. `;
  if (genres.length || styles.length || media.length) {
    prompt += `Create a painting `;
    if (genres.length) {
      prompt += `of genres "${genres.join(",")}", `;
    }
    if (styles.length) {
      prompt += `with styles "${styles.join(",")}", `;
    }
    if (media.length) {
      prompt += `on media "${media.join(",")}", `;
    }
    prompt = prompt.slice(0, -2) + ". ";
  }
  prompt += `Its description is: "${description}".`;

  return fetch(`${ENDPOINT}/images/generations`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: OPENAI_MODEL.DALL_E_3,
      prompt,
      n: 1,
      size: OPENAI_DALL_E_SIZES[size],
    }),
  });
};
