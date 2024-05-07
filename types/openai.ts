export enum OPENAI_MODEL {
  GPT_4_TURBO = "gpt-4-turbo",
  DALL_E_2 = "dall-e-2",
  DALL_E_3 = "dall-e-3",
}

export enum OPENAI_DALL_E_SIZES {
  "SQUARE" = "1024x1024",
  "VERTICAL" = "1024x1792",
  "HORIZONTAL" = "1792x1024",
}

export type GetDescriptionImageDetail = "low" | "high" | "auto";

export type OpenAiParameters = {
  getDescriptionImageDetail: GetDescriptionImageDetail;
  getDescriptionMaxTokens: number;
  generateImagePrefixAsIs: boolean;
  generateImagePaintingDetails: boolean;
};
