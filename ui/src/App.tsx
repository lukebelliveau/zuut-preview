import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Redirect, Route, useHistory } from 'react-router';
import { Router } from 'react-router-dom';

import { browserHistory, isDemoMode, ZUUT_DEMO_STATE } from './app/store';
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
import { useDispatch } from 'react-redux';
import {
  createPlan,
  deleteAllPlans,
  removeAll as removeAllPlans,
} from './features/plans/planSlice';
import { removeAllItems } from './features/items/itemsSlice';
import { createDemoPlan } from './features/playgrounds/playgroundSlice';
import { useEffect } from 'react';
import ShoppingCart, { shopping_cart_path } from './routes/ShoppingCart';

export const new_demo_path = () => '/newdemo';
const NewDemoPlayground = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAllPlans());
    dispatch(removeAllItems(true));
    localStorage.removeItem(ZUUT_DEMO_STATE);
    dispatch(createDemoPlan());
  });

  if (!isDemoMode()) {
    return <Redirect to={new_playground_path()} />;
  }

  return <Redirect to={demo_playground_path()} />;
};
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router history={browserHistory}>
        <AppErrorBoundary>
          <Route exact path={homePath()}>
            <Home />
          </Route>
          <Route path={new_playground_path()}>
            <RequireAuth>
              <NewPlayground />
            </RequireAuth>
          </Route>
          <Route path={new_demo_path()}>
            <NewDemoPlayground />
          </Route>
          <Route path={playground_path()}>
            <RequireAuth>
              <ShowPlayground />
            </RequireAuth>
          </Route>
          <Route path={demo_playground_path()}>
            <ShowPlayground />
          </Route>
          <Route path={shopping_cart_path()}>
            <ShoppingCart />
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
      </Router>
    </DndProvider>
  );
}

export default App;
