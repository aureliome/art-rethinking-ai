import { useState } from "react";

export default function StepDetail({
  request,
  response,
}: {
  request: React.ReactNode;
  response: React.ReactNode;
}) {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <div>
      {showDetail ? (
        <div className="row">
          <div className="col s12 m6">
            <h6>REQUEST</h6>
            {request}
          </div>
          <div className="col s12 m6">
            <h6>RESPONSE</h6>
            {response}
          </div>
        </div>
      ) : (
        <p>
          <a
            className="btn-flat teal-text"
            onClick={() => {
              setShowDetail(true);
            }}
          >
            Show detail
          </a>
        </p>
      )}
    </div>
  );
}
