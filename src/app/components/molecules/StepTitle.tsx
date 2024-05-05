import { KeyedMutator } from "swr";
import Title from "../atoms/Title";

export default function StepTitle({
  title,
  data,
  error,
  isLoading,
  onRetry,
}: {
  title: string;
  data: any;
  error: any;
  isLoading: boolean;
  onRetry: KeyedMutator<any>;
}) {
  return (
    <div>
      {isLoading && (
        <>
          <Title>{title}</Title>
          <p className="center-align">
            <i>
              LOADING...
              <br />
              it could take some seconds
            </i>
          </p>
        </>
      )}

      {error && (
        <>
          <Title>{title}</Title>
          <div className="center-align">
            <i className="red-text">An error occured</i>
          </div>
          <div className="center-align">
            <button className="btn-small" onClick={onRetry}>
              RETRY
            </button>
          </div>
        </>
      )}

      {data && <Title>{title}</Title>}
    </div>
  );
}
