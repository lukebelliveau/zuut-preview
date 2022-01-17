import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { planStateBuilder } from './features/plans/planReduxAdapter';
import { create } from './features/plans/planSlice';
import { setPlan } from './features/playgrounds/playgroundSlice';
import Plan from './lib/plan';
import AccessDenied from './routes/AccessDenied';
import Home, { homePath } from './routes/Home';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import NewPlayground, { new_playground_path } from './routes/playgrounds/NewPlayground';
import ShowPlayground, { playground_path } from './routes/playgrounds/ShowPlayground';
import Workplace from './routes/Workplace';

function App() {
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstLoad) {
      const plan = Plan.sandbox();
      dispatch(create(planStateBuilder(plan)));
      dispatch(setPlan(plan.id));
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
