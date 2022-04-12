import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useHistory } from 'react-router';
import { mixpanelEvents } from '../analytics/mixpanelEvents';
import { mixpanelTrack } from '../analytics/mixpanelTrack';
import { new_playground_path } from '../routes/playgrounds/NewPlayground';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <p>
        You can try navigating back to the page you are on, or click the button
        below to build a new playground.
      </p>
      <p>
        <strong>
          WARNING: Building a new playground will erase your current playground.
        </strong>
      </p>
      <button onClick={resetErrorBoundary}>Build a new playground</button>
    </div>
  );
}

const AppErrorBoundary = ({ children }: { children: ReactNode }) => {
  const history = useHistory();
  const { user } = useAuth0();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        history.push(`${new_playground_path()}?reset-playground=true`);
      }}
      onError={(error: Error, info: { componentStack: string }) => {
        mixpanelTrack(mixpanelEvents.ERROR, {
          error,
          info,
          user,
          errorMessage: error.message,
          errorJson: JSON.stringify(error),
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
