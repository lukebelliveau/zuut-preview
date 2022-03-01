import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createBrowserHistory, History } from 'history';

import itemsReducer from '../features/items/itemsSlice';
import playgroundReducer from '../features/playgrounds/playgroundSlice';
import plansReducer from '../features/plans/planSlice';
import interactionsReducer from '../features/interactions/interactionsSlice';
import userReducer from '../features/users/userSlice';

export const browserHistory = createBrowserHistory<unknown>();
const reduxLoggerEnabled = false;

export function createAppStore() {
  return configureStore({
    reducer: {
      items: itemsReducer,
      plans: plansReducer,
      playground: playgroundReducer,
      interactions: interactionsReducer,
      user: userReducer,
      router: (state, action) => (
        connectRouter(browserHistory)(state as RouterState<unknown>, action)  // HACK: typescript
      ),
    },
    middleware: (getDefaultMiddleware) => {
      let middlewares = getDefaultMiddleware();
      if (reduxLoggerEnabled) middlewares = middlewares.concat(logger);
      return middlewares.concat(routerMiddleware(browserHistory));
    }
  });
};

const typedStore = createAppStore();
export type AppDispatch = typeof typedStore.dispatch;
export type RootState = ReturnType<typeof typedStore.getState>;
export type AppStore = ReturnType<typeof createAppStore>;
