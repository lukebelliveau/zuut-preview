import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import { PlanState } from './features/plans/planState';
import usePlaygroundEffects from './features/playgrounds/playgroundEffects';
import usePlanAdapter from './lib/plan/planAdapter';
import usePlaygroundAdapter from './lib/playground';
import AccessDenied from './routes/AccessDenied';
import Home, { homePath } from './routes/Home';
import NotFound from './routes/NotFound';
import NewPlayground, {
  new_playground_path,
} from './routes/playgrounds/NewPlayground';
import ShowPlayground, {
  playground_path,
} from './routes/playgrounds/ShowPlayground';
import Workplace from './routes/Workplace';

export const sandboxPlan: PlanState = {
  name: '',
  id: '0',
  room: undefined,
};

const useResizeEventListener = () => {
  const { resizePlaygroundOnWindowResize } = usePlaygroundEffects();

  useEffect(() => {
    window.addEventListener('resize', () => {
      resizePlaygroundOnWindowResize();
    });
  }, [resizePlaygroundOnWindowResize]);
};

const useResizeWindowAndCreatePlanOnFirstLoad = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const { resizePlaygroundOnWindowResize } = usePlaygroundEffects();
  const planAdapter = usePlanAdapter();
  const playgroundAdapter = usePlaygroundAdapter();

  useEffect(() => {
    if (firstLoad) {
      const plan = sandboxPlan;
      planAdapter.create(plan);
      playgroundAdapter.setPlan(plan);
      resizePlaygroundOnWindowResize();
      setFirstLoad(false);
    }
  }, [
    playgroundAdapter,
    firstLoad,
    planAdapter,
    resizePlaygroundOnWindowResize,
  ]);
};

function App() {
  useResizeEventListener();
  useResizeWindowAndCreatePlanOnFirstLoad();

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
