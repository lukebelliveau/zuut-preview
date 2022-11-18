import { Container, Button } from '@mui/material';
import { ZUUT_DEMO_STATE } from 'src/redux/store';
import { ErrorBoundary } from 'react-error-boundary';
import mixpanelTrack from 'src/utils/mixpanelTrack';

const TopLevelErrorFallback = ({
  error,
  resetErrorBoundary,
  toTrack,
  errorName,
}: {
  error: Error;
  resetErrorBoundary: () => void;
  toTrack?: { [key: string]: any };
  errorName?: string;
}) => {
  mixpanelTrack(errorName ? errorName : 'Top Level Error', {
    errorMessage: error.message,
    ...toTrack,
  });

  return (
    <div
      role="alert"
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        zIndex: 9001,
      }}
    >
      <Container sx={{ paddingLeft: '200px' }}>
        <p>
          Something went wrong. We're sorry about this, and our dev team has
          already been notified!
        </p>
        <p>Things should get up and running again if you reload this page.</p>
        <p>
          If that doesn't work, click the button below to clear your ZUUT
          cookies. That should definitely do the trick!
        </p>
        <p>
          Please be aware that clearing your cookies will cause you to lose the
          current state of your demo playground.
        </p>
        <b>
          We would really appreciate it if you could leave us some feedback with
          the red button on the left. Thank you for trying ZUUT!
        </b>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'start',
          }}
        >
          <Button
            onClick={() => {
              window.location.href = window.location.origin;
            }}
            sx={{ paddingLeft: 0 }}
          >
            Try again
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem(ZUUT_DEMO_STATE);
              window.location.href = window.location.origin;
            }}
            sx={{ paddingLeft: 0 }}
          >
            Delete Cookies
          </Button>
        </div>
      </Container>
    </div>
  );
};

const TopLevelErrorBoundary = ({
  children,
  toTrack,
  errorName,
}: {
  children: JSX.Element;
  toTrack?: { [key: string]: any };
  errorName?: string;
}) => {
  return (
    <ErrorBoundary
      fallbackRender={({
        error,
        resetErrorBoundary,
      }: {
        error: Error;
        resetErrorBoundary: () => void;
      }) => {
        return (
          <TopLevelErrorFallback
            error={error}
            resetErrorBoundary={resetErrorBoundary}
            toTrack={toTrack}
            errorName={errorName}
          />
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default TopLevelErrorBoundary;
