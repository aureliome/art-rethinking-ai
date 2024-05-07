import { ChangeEvent } from "react";
import {
  GetDescriptionImageDetail,
  OpenAiParameters,
} from "../../../../types/openai";
import Step from "../molecules/Step";
import SetParametersForm from "../molecules/SetParametersForm";

export default function Step2SelectParameters({
  editable,
  collapsed,
  parameters,
  onSetParameters,
  onSuccess,
  onGoBack,
}: {
  editable: boolean;
  collapsed: boolean;
  parameters: OpenAiParameters;
  onSetParameters: (parameters: OpenAiParameters) => void;
  onSuccess: () => void;
  onGoBack: () => void;
}) {
  return (
    <Step title="Set the parameters" collapsed={collapsed}>
      <SetParametersForm
        editable={editable}
        parameters={parameters}
        onSetParameters={onSetParameters}
      />

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
