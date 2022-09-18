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
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { createReduxHistoryContext } from 'redux-first-history';

export const isDemoMode = () => {
  if (process.env.NODE_ENV === 'production') return true;

  return window.location.href.includes('demo');
};
export const ZUUT_DEMO_STATE = 'zuut-state';

const reduxLoggerEnabled = false;

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({
  onError: console.error,
});

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    //other options if needed
  });

const reducers = {
  items: undoable<EntityState<ItemState>>(itemsReducer, {
    filter: includeAction([
      updateOne.type,
      addOne.type,
      removeOne.type,
      removeMany.type,
      'items/removeItems/pending',
      'items/removeItems/fulfilled',
    ]),
  }),
  plans: plansReducer,
  playground: playgroundReducer,
  interactions: interactionsReducer,
  user: userReducer,
  router: routerReducer,
};

/**
 * exclude immutableCheck if it starts slowing things down
 */
const getAppDefaultMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
  // ) => getDefaultMiddleware({ immutableCheck: true });
) => getDefaultMiddleware();

export function createAppStore() {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
      if (reduxLoggerEnabled) {
        return getDefaultMiddleware()
          .concat(routerMiddleware)
          .concat(errorHandlerMiddleware)
          .concat(logger);
      } else {
        return getDefaultMiddleware()
          .concat(errorHandlerMiddleware)
          .concat(routerMiddleware);
      }
    },
  });
}

export function getDemoModeStore() {
  const persistentState = localStorage.getItem(ZUUT_DEMO_STATE)
    ? JSON.parse(localStorage.getItem(ZUUT_DEMO_STATE) || '')
    : {};

  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
      if (reduxLoggerEnabled) {
        return getDefaultMiddleware()
          .concat(routerMiddleware)
          .concat(errorHandlerMiddleware)
          .concat(logger);
      } else {
        return getDefaultMiddleware()
          .concat(errorHandlerMiddleware)
          .concat(routerMiddleware);
      }
    },
    preloadedState: persistentState,
  });
}

export const store = isDemoMode() ? getDemoModeStore() : createAppStore();
export const browserHistory = createReduxHistory(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof createAppStore>;

if (isDemoMode()) {
  store.subscribe(() => {
    const state = store.getState();
    const serializedState = JSON.stringify(state);
    localStorage.setItem(ZUUT_DEMO_STATE, serializedState);
  });
}
