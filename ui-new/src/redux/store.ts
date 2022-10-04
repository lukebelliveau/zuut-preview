import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore, EntityState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import undoable, { includeAction } from 'redux-undo';
import rison from 'rison-node';

import itemsReducer, {
  addOne,
  removeMany,
  removeOne,
  updateOne,
} from './features/items/itemsSlice';
import playgroundReducer from './features/playgrounds/playgroundSlice';
import plansReducer from './features/plans/planSlice';
import interactionsReducer from './features/interactions/interactionsSlice';
import userReducer from './features/users/userSlice';
import { ItemState } from './features/items/itemState';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux';

export const isDemoMode = () => {
  if (process.env.NODE_ENV === 'production') return true;

  return window.location.href.includes('demo');
};
export const ZUUT_DEMO_STATE = 'zuut-state';

const reduxLoggerEnabled = false;

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({
  onError: console.error,
});

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
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
        return getDefaultMiddleware({
          immutableCheck: false,
        })
          .concat(routerMiddleware)
          .concat(errorHandlerMiddleware);
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
        return getDefaultMiddleware().concat(routerMiddleware).concat(errorHandlerMiddleware);
      }
    },
    preloadedState: persistentState,
  });
}

export const store = isDemoMode() ? getDemoModeStore() : createAppStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof createAppStore>;

export const TypedStore = createAppStore();
export type AppDispatch = typeof TypedStore.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const browserHistory = createReduxHistory(store);

const { dispatch } = store;

export { dispatch };

if (isDemoMode()) {
  store.subscribe(() => {
    const state = store.getState();
    const serializedState = JSON.stringify(state);
    localStorage.setItem(ZUUT_DEMO_STATE, serializedState);

    // const shareableStore = {
    //   plan: state.plans.entities[state.playground.planId],
    //   items: state.items.present.entities,
    // };

    // console.log(rison.encode(shareableStore));
  });
}
