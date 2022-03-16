import { connectRouter, routerMiddleware } from 'connected-react-router';
import { configureStore, EntityState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createBrowserHistory, LocationState } from 'history';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import undoable, { includeAction } from 'redux-undo';

import itemsReducer, {
  addOne,
  removeMany,
  removeOne,
  updateOne,
} from '../features/items/itemsSlice';
import playgroundReducer from '../features/playgrounds/playgroundSlice';
import plansReducer from '../features/plans/planSlice';
import interactionsReducer from '../features/interactions/interactionsSlice';
import userReducer from '../features/users/userSlice';
import { ItemState } from '../features/items/itemState';

export const browserHistory = createBrowserHistory<unknown>();
const reduxLoggerEnabled = false;

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({
  onError: console.error,
});

export function createAppStore() {
  return configureStore({
    reducer: {
      items: undoable<EntityState<ItemState>>(itemsReducer, {
        filter: includeAction([
          updateOne.type,
          addOne.type,
          removeOne.type,
          removeMany.type,
        ]),
      }),
      plans: plansReducer,
      playground: playgroundReducer,
      interactions: interactionsReducer,
      user: userReducer,
      router: connectRouter<LocationState>(browserHistory),
    },
    middleware: (getDefaultMiddleware) => {
      let middlewares = getDefaultMiddleware();
      if (reduxLoggerEnabled) middlewares = middlewares.concat(logger);
      return middlewares
        .concat(routerMiddleware(browserHistory))
        .concat(errorHandlerMiddleware);
    },
  });
}

export const store = createAppStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof createAppStore>;
