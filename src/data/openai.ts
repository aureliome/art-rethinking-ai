const ENDPOINT = "https://api.openai.com/v1";

enum MODELS {
  GPT_4_TURBO = "gpt-4-turbo",
  DALL_E_2 = "dall-e-2",
  DALL_E_3 = "dall-e-3",
}

enum DALL_E_SIZES {
  "SQUARE" = "1024x1024",
  "VERTICAL" = "1024x1792",
  "HORIZONTAL" = "1792x1024",
}

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  "Content-Type": "application/json",
};

const getDescriptionFromAnImage = ({
  imageUrl,
  imageLevelDetail = "low",
}: {
  imageUrl: string;
  imageLevelDetail?: "low" | "high";
}) => {
  return fetch(`${ENDPOINT}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: MODELS.GPT_4_TURBO,
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
                detail: imageLevelDetail,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    }),
  });
};

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
      model: MODELS.DALL_E_3,
      prompt,
      n: 1,
      size: DALL_E_SIZES[size],
    }),
  });
};

export { getDescriptionFromAnImage, generateImageFromPrompt };
