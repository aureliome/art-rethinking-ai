import { ReactNode } from "react";

export default function StepDetail({
  request,
  response,
}: {
  request: React.ReactNode;
  response: React.ReactNode;
}) {
  return (
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
  );
}
