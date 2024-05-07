import { KeyedMutator } from "swr";

export default function StepAsyncContent({
  children,
  data,
  error,
  isLoading,
  onRetry,
}: {
  children: React.ReactNode;
  data: any;
  error: any;
  isLoading: boolean;
  onRetry: KeyedMutator<any>;
}) {
  return (
    <div>
      {isLoading && (
        <p className="center-align">
          <i>
            LOADING...
            <br />
            it could take some seconds
          </i>
        </p>
      )}

      {error && (
        <>
          <div className="center-align">
            <i className="red-text">
              An error occured
              <br />
              <span>{error?.message || ""}</span>
            </i>
          </div>
          <div className="center-align">
            <button className="btn-small" onClick={onRetry}>
              RETRY
            </button>
          </div>
        </>
      )}

      {data && children}
    </div>
  );
}
