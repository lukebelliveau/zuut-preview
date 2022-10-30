import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore, createSlice, EntityState } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import undoable, { includeAction } from 'redux-undo';
import { createClient } from '@liveblocks/client';
import { enhancer } from '@liveblocks/redux';

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

export const liveblocksClient = createClient({
  publicApiKey: 'pk_dev_bguZcseOKlVRCbXmiYOihPNQjYGN4u5uC_AjP0_IcyM6NMQ6J0SjvXtLEhK0K9wx',
});

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

const liveblocks = createSlice({
  name: 'liveblocks',
  initialState: {},
  reducers: {},
});

const reducers = {
  // items: undoable<EntityState<ItemState>>(itemsReducer, {
  //   filter: includeAction([
  //     updateOne.type,
  //     addOne.type,
  //     removeOne.type,
  //     removeMany.type,
  //     'items/removeItems/pending',
  //     'items/removeItems/fulfilled',
  //   ]),
  // }),
  items: itemsReducer,
  plans: plansReducer,
  playground: playgroundReducer,
  interactions: interactionsReducer,
  user: userReducer,
  router: routerReducer,
  // put a `liveblocks` something here, so redux doesn't freak out once the liveblocks enhancer creates this piece of state.
  liveblocks: liveblocks.reducer,
};

/**
 * exclude immutableCheck if it starts slowing things down
 */
const getAppDefaultMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
  // ) => getDefaultMiddleware({ immutableCheck: true });
) => getDefaultMiddleware();

export function createAppStore() {
  console.log('CONFIGURE APP STORE');
  return configureStore({
    reducer: reducers,
    enhancers: [enhancer({ client: liveblocksClient, storageMapping: { items: true } })],
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
  console.log('WOOOO');
  const persistentState = localStorage.getItem(ZUUT_DEMO_STATE)
    ? JSON.parse(localStorage.getItem(ZUUT_DEMO_STATE) || '')
    : {};

  return configureStore({
    reducer: reducers,
    enhancers: [enhancer({ client: liveblocksClient, storageMapping: { items: true } })],
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
