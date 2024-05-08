import { ChangeEvent } from "react";
import {
  OpenAiParameters,
  GetDescriptionImageDetail,
} from "../../../../types/openai";
import style from "./SetParametersForm.module.css";

export default function SetParametersForm({
  editable,
  parameters,
  onSetParameters,
}: {
  editable: boolean;
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

      <h6>Get a description of the artwork</h6>
      <div className="row">
        <div className="col s12 m6">
          <label htmlFor="getDescriptionImageDetail">
            <a
              target="_blank"
              href="https://platform.openai.com/docs/guides/vision/low-or-high-fidelity-image-understanding"
            >
              Image understanding fidelity level
            </a>
            . Higher values consume more tokens
          </label>
          {editable ? (
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
          ) : (
            <p>
              <strong>
                {parameters.getDescriptionImageDetail.toUpperCase()}
              </strong>
            </p>
          )}
        </div>

        <div className="col s12 m6">
          <label htmlFor="getDescriptionMaxTokens">
            Maximum tokens used for the description
          </label>
          {editable ? (
            <input
              type="number"
              name="getDescriptionMaxTokens"
              value={parameters.getDescriptionMaxTokens}
              onChange={handleGetDescriptionMaxTokens}
            />
          ) : (
            <p>
              <strong>{parameters.getDescriptionMaxTokens}</strong>
            </p>
          )}
        </div>
      </div>

      <h6>Generate a new image</h6>
      <div className="row">
        <div className="col s12 m6">
          <label htmlFor="generateImagePrefixAsIs">
            (Recommended) Add the prefix{" "}
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
              This helps generate a new image that closely matches the original
              description.
            </a>
          </label>
          {editable ? (
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
          ) : (
            <p>
              <strong>
                {parameters.generateImagePrefixAsIs ? "ENABLED" : "DISABLED"}
              </strong>
            </p>
          )}
        </div>

        <div className="col s12 m6">
          <label htmlFor="generateImagePaintingDetails">
            Add painting data (genre, style, and medium) to the prompt used to
            create the new image. Enabling this option results in an image
            closer to the original.
            <br />
            <u>
              However, the title and artist of the artwork will not be
              mentioned.
            </u>
          </label>
          {editable ? (
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
          ) : (
            <p>
              <strong>
                {parameters.generateImagePaintingDetails
                  ? "ENABLED"
                  : "DISABLED"}
              </strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
