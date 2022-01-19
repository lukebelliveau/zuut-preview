import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import Plan from './lib/plan';
import PlanRepository from './lib/plan/planRepository';
import PlaygroundRepository from './lib/playground/playgroundRepository';
import AccessDenied from './routes/AccessDenied';
import Home, { homePath } from './routes/Home';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import NewPlayground, { new_playground_path } from './routes/playgrounds/NewPlayground';
import ShowPlayground, { playground_path } from './routes/playgrounds/ShowPlayground';
import Workplace from './routes/Workplace';

const planRepo = PlanRepository.forRedux();
const playgroundRepo = PlaygroundRepository.forRedux();

function App() {
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstLoad) {
      const plan = Plan.sandbox();
      planRepo.create(plan);

      const playground = playgroundRepo.select();
      playground.plan = plan;
      playgroundRepo.update(playground);

      setFirstLoad(false);
    }
  }, [dispatch, firstLoad]);

  return (
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
        <Route path="/login" element={<Login />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
