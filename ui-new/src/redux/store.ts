import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore, EntityState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import undoable, { includeAction } from 'redux-undo';

import itemsReducer, {
  addOne,
  removeMany,
  removeOne,
  updateOne,
} from './features/items/itemsSlice';
import cartReducer from './features/cart/cartSlice';
import playgroundReducer from './features/playgrounds/playgroundSlice';
import plansReducer from './features/plans/planSlice';
import interactionsReducer from './features/interactions/interactionsSlice';
import userReducer from './features/users/userSlice';
import { ItemState } from './features/items/itemState';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux';
import { ref, set } from 'firebase/database';
import { firebaseDb, firebaseInit } from './firebaseInit';

firebaseInit();

export const isDemoMode = () => {
  if (process.env.NODE_ENV === 'production') return true;

  return window.location.href.includes('demo');
};
export const ZUUT_DEMO_STATE = 'zuut-state';
export const ZUUT_DEMO_STATE_LAST_SAVED = 'zuut-last-saved';

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
  cart: cartReducer,
};

const olderThanDaysAgo = (timestamp: number, days: number) => {
  const day = 1000 * 60 * 60 * 24;
  const daysAgo = Date.now() - day * days;

  return timestamp < daysAgo;
};

const getPersistentState = () => {
  if (isDemoMode()) {
    const lastSaved = localStorage.getItem(ZUUT_DEMO_STATE_LAST_SAVED);
    if (!lastSaved) {
      console.log('deleting old demo state, no timestamp');
      localStorage.removeItem(ZUUT_DEMO_STATE);
      return undefined;
    } else if (olderThanDaysAgo(parseInt(lastSaved), 3)) {
      console.log(`deleting old demo state, too old`);
      localStorage.removeItem(ZUUT_DEMO_STATE);
      return undefined;
    }
    const state = localStorage.getItem(ZUUT_DEMO_STATE);
    if (state) {
      return JSON.parse(state);
    }
  }
  return undefined;
};

export function createAppStore() {
  const persistentState = getPersistentState();

  return configureStore({
    // undefined if not demo mode (see getPersistentState())
    preloadedState: persistentState,
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

export const store = createAppStore();
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
    localStorage.setItem(ZUUT_DEMO_STATE_LAST_SAVED, Date.now().toString());
  });
}

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  set(ref(firebaseDb, 'grows/' + state.playground.planId), serializedState);
});
