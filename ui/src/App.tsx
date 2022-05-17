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
  demo_playground_path,
  playground_path,
} from './routes/playgrounds/ShowPlayground';
import Workplace from './routes/Workplace';
import AppErrorBoundary from './components/ErrorFallback';
import SessionExpired from './routes/SessionExpired';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ConnectedRouter history={browserHistory}>
        <AppErrorBoundary>
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
          <Route path={demo_playground_path()}>
            <ShowPlayground />
          </Route>
          <Route path="/workplace">
            <RequireAuth>
              <Workplace />
            </RequireAuth>
          </Route>
          <Route path="/access-denied">
            <AccessDenied />
          </Route>
          <Route path="/session-expired">
            <SessionExpired />
          </Route>
        </AppErrorBoundary>
      </ConnectedRouter>
    </DndProvider>
  );
}

export default App;
