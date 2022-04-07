function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}) {
  console.log(error, resetErrorBoundary);
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

export default ErrorFallback;
