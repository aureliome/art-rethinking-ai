import Step from "../molecules/Step";

export default function Step2SelectParameters({
  collapsed,
  onSuccess,
  onGoBack,
}: {
  collapsed: boolean;
  onSuccess: () => void;
  onGoBack: () => void;
}) {
  return (
    <Step title="Set the parameters" collapsed={collapsed}>
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
