import { ChangeEvent } from "react";
import {
  GetDescriptionImageDetail,
  OpenAiParameters,
} from "../../../../types/openai";
import Step from "../molecules/Step";

export default function Step2SelectParameters({
  collapsed,
  parameters,
  onSetParameters,
  onSuccess,
  onGoBack,
}: {
  collapsed: boolean;
  parameters: OpenAiParameters;
  onSetParameters: (parameters: OpenAiParameters) => void;
  onSuccess: () => void;
  onGoBack: () => void;
}) {
  const handleGetDescriptionImageDetail = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onSetParameters({
      ...parameters,
      getDescriptionImageDetail: event.target
        .value as GetDescriptionImageDetail,
    });
  };

  const handleGetDescriptionMaxTokens = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onSetParameters({
      ...parameters,
      getDescriptionMaxTokens: Number(event.target.value),
    });
  };

  const handleGenerateImagePrefixAsIs = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onSetParameters({
      ...parameters,
      generateImagePrefixAsIs: event.target.checked,
    });
  };

  const handleGenerateImagePaintingDetails = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onSetParameters({
      ...parameters,
      generateImagePaintingDetails: event.target.checked,
    });
  };

  return (
    <Step title="Set the parameters" collapsed={collapsed}>
      <div>
        <p>They are the parameters to use for OpenAI APIs.</p>

        <h6>Get description of the artwork</h6>
        <div className="row">
          <div className="col s12">
            <p>
              <label htmlFor="getDescriptionImageDetail">
                <a
                  target="_blank"
                  href="https://platform.openai.com/docs/guides/vision/low-or-high-fidelity-image-understanding"
                >
                  Understanding fidelity image level
                </a>
              </label>
              <select
                className="browser-default"
                name="getDescriptionImageDetail"
                value={parameters.getDescriptionImageDetail}
                onChange={handleGetDescriptionImageDetail}
              >
                <option value="low">low</option>
                <option value="high">high</option>
                <option value="auto">auto</option>
              </select>
            </p>

            <p>
              <label htmlFor="getDescriptionMaxTokens">
                Max tokens used for the description
              </label>
              <input
                type="number"
                name="getDescriptionMaxTokens"
                value={parameters.getDescriptionMaxTokens}
                onChange={handleGetDescriptionMaxTokens}
              />
            </p>
          </div>
        </div>

        <h6>Generate a new image</h6>
        <div className="row">
          <div className="col s12">
            <p>
              <label htmlFor="generateImagePrefixAsIs">
                (Recommened) Add the prefix
                <b>
                  &quot;I NEED to test how the tool works with extremely simple
                  prompts. DO NOT add any detail, just use it AS-IS.&quot;
                </b>
                .
                <br />
                <a
                  target="_blank"
                  href="https://platform.openai.com/docs/guides/images/prompting"
                >
                  It is useful to get new image closer to the original
                  description.
                </a>
              </label>
              <div className="switch">
                <label>
                  Off
                  <input
                    type="checkbox"
                    name="generateImagePrefixAsIs"
                    checked={parameters.generateImagePrefixAsIs}
                    onChange={handleGenerateImagePrefixAsIs}
                  />
                  <span className="lever"></span>
                  On
                </label>
              </div>
            </p>

            <p>
              <label htmlFor="generateImagePaintingDetails">
                Add painting data (genre, styles and media) to the prompt used
                to generate the new image. Enabling it allow to have an image
                closer to the original.
                <br />
                <b>
                  Title and artist name of the artwork will be not mentioned in
                  any case.
                </b>
              </label>
              <div className="switch">
                <label>
                  Off
                  <input
                    type="checkbox"
                    name="generateImagePaintingDetails"
                    checked={parameters.generateImagePaintingDetails}
                    onChange={handleGenerateImagePaintingDetails}
                  />
                  <span className="lever"></span>
                  On
                </label>
              </div>
            </p>
          </div>
        </div>
      </div>

      {/* TODO: add parameters */}
      {!collapsed && (
        <div className="row">
          <div className="col s6 right-align">
            <button
              className="btn-large black-text white"
              onClick={() => {
                onGoBack();
              }}
            >
              GO BACK
            </button>
          </div>
          <div className="col s6 left-align">
            <button
              className="btn-large"
              onClick={() => {
                onSuccess();
              }}
            >
              START
            </button>
          </div>
        </div>
      )}
    </Step>
  );
}
