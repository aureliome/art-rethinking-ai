import { ChangeEvent } from "react";
import {
  OpenAiParameters,
  GetDescriptionImageDetail,
} from "../../../../types/openai";
import style from "./SetParametersForm.module.css";

export default function SetParametersForm({
  parameters,
  onSetParameters,
}: {
  parameters: OpenAiParameters;
  onSetParameters: (parameters: OpenAiParameters) => void;
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
    <div className={style.form}>
      <p>They are the parameters will be used for OpenAI APIs.</p>

      <h6>Get description of the artwork</h6>
      <div className="row">
        <p className="col s12 m6">
          <label htmlFor="getDescriptionImageDetail">
            <a
              target="_blank"
              href="https://platform.openai.com/docs/guides/vision/low-or-high-fidelity-image-understanding"
            >
              Understanding fidelity image level
            </a>
            . High value consumes more tokens
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

        <p className="col s12 m6">
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

      <h6>Generate a new image</h6>
      <div className="row">
        <p className="col s12 m6">
          <label htmlFor="generateImagePrefixAsIs">
            (Recommened) Add the prefix{" "}
            <i>
              &quot;I NEED to test how the tool works with extremely simple
              prompts. DO NOT add any detail, just use it AS-IS.&quot;
            </i>
            .
            <br />
            <a
              target="_blank"
              href="https://platform.openai.com/docs/guides/images/prompting"
            >
              It is useful to get new image closer to the original description.
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

        <p className="col s12 m6">
          <label htmlFor="generateImagePaintingDetails">
            Add painting data (genre, styles and media) to the prompt used to
            generate the new image. Enabling it allows to have an image closer
            to the original.
            <br />
            <u>
              Title and artist name of the artwork will be not mentioned in any
              case.
            </u>
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
  );
}
