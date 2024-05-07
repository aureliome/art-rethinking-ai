"use client";

import { useState } from "react";
import Step1SelectPainting from "./components/steps/Step1SelectPainting";
import Step2SelectParameters from "./components/steps/Step2SetParameters";
import Step3GetImageDescription from "./components/steps/Step3GetImageDescription";
import Step4GenerateImage from "./components/steps/Step4GenerateImage";
import Step5ShowResult from "./components/steps/Step5ShowResult";
import Introduction from "./components/atoms/Introduction";
import { OpenAiParameters } from "../../types/openai";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [selectedPainting, setSelectedPaiting] = useState<null | Painting>(
    null
  );
  const [imageDescription, setImageDescription] = useState<null | string>(null);
  const [newImageUrl, setNewImageUrl] = useState<null | string>(null);
  const [openAiParameters, setOpenAiParameters] = useState<OpenAiParameters>({
    getDescriptionImageDetail: "low",
    getDescriptionMaxTokens: 300,
    generateImagePrefixAsIs: true,
    generateImagePaintingDetails: false,
  });

  function goToStep2(painting: Painting) {
    setSelectedPaiting(painting);
    setStep(2);
  }

  function goToStep3() {
    setStep(3);
  }

  function goToStep4(imageDescription: string) {
    setImageDescription(imageDescription);
    setStep(4);
  }

  function goToStep5(newImageUrl: string) {
    setNewImageUrl(newImageUrl);
    setStep(5);
  }

  function restart() {
    setSelectedPaiting(null);
    setImageDescription(null);
    setNewImageUrl(null);
    setStep(1);
  }

  return (
    <main>
      <h2>Art Rethinking AI</h2>
      <Introduction />

      <div>{JSON.stringify(openAiParameters)}</div>

      {step >= 1 && (
        <Step1SelectPainting
          selectedPaiting={selectedPainting}
          collapsed={step > 1}
          onSuccess={goToStep2}
        />
      )}

      {step >= 2 && selectedPainting && (
        <Step2SelectParameters
          collapsed={step > 2}
          parameters={openAiParameters}
          onSetParameters={setOpenAiParameters}
          onSuccess={goToStep3}
          onGoBack={restart}
        />
      )}

      {step >= 3 && selectedPainting && (
        <Step3GetImageDescription
          collapsed={step > 3}
          imageUrl={selectedPainting.image}
          onSuccess={goToStep4}
        />
      )}

      {step >= 4 && selectedPainting && imageDescription && (
        <Step4GenerateImage
          collapsed={step > 4}
          paiting={selectedPainting}
          imageDescription={imageDescription}
          onSuccess={goToStep5}
        />
      )}

      {step === 5 && selectedPainting && newImageUrl && (
        <Step5ShowResult
          originalImageUrl={selectedPainting.image}
          newImageUrl={newImageUrl}
          onRetry={restart}
        />
      )}
    </main>
  );
}
