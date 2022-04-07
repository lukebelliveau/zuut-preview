import { ConnectedRouter } from 'connected-react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, useHistory } from 'react-router';

import { browserHistory } from './app/store';
import RequireAuth from './components/RequireAuth';
import AccessDenied from './routes/AccessDenied';
import Home, { homePath } from './routes/Home';
import NewPlayground, {
  new_playground_path,
} from './routes/playgrounds/NewPlayground';
import ShowPlayground, {
  playground_path,
} from './routes/playgrounds/ShowPlayground';
import Workplace from './routes/Workplace';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import { mixpanelTrack } from './analytics/mixpanelTrack';
import { mixpanelEvents } from './analytics/mixpanelEvents';

function App() {
  const history = useHistory();
  return (
    <DndProvider backend={HTML5Backend}>
      <ConnectedRouter history={browserHistory}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            history.push(`${new_playground_path()}?reset-playground=true`);
            // reset the state of your app so the error doesn't happen again
          }}
          onError={(error: Error, info: { componentStack: string }) => {
            mixpanelTrack(mixpanelEvents.ERROR, { error, info });
          }}
        >
          <Route exact path={homePath()}>
            <Home />
          </Route>
          <Route path={new_playground_path()}>
            <RequireAuth>
              <NewPlayground />
            </RequireAuth>
          </Route>
          <Route path={playground_path()}>
            <RequireAuth>
              <ShowPlayground />
            </RequireAuth>
          </Route>
          <Route path="/workplace">
            <RequireAuth>
              <Workplace />
            </RequireAuth>
          </Route>
          <Route path="/access-denied">
            <AccessDenied />
          </Route>
        </ErrorBoundary>
      </ConnectedRouter>
    </DndProvider>
  );
}

export default App;
