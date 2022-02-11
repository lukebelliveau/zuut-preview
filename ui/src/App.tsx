import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import AccessDenied from './routes/AccessDenied';
import Home, { homePath } from './routes/Home';
import NotFound from './routes/NotFound';
import NewPlayground, { new_playground_path } from './routes/playgrounds/NewPlayground';
import ShowPlayground, { playground_path } from './routes/playgrounds/ShowPlayground';
import Workplace from './routes/Workplace';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path={homePath()} element={<Home />} />
          <Route
            path={new_playground_path()}
            element={
              <RequireAuth>
                <NewPlayground />
              </RequireAuth>
            }
          />
          <Route
            path={playground_path()}
            element={
              <RequireAuth>
                <ShowPlayground />
              </RequireAuth>
            }
          />
          <Route
            path="/workplace"
            element={
              <RequireAuth>
                <Workplace />
              </RequireAuth>
            }
          />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
