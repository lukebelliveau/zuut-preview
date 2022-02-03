import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import itemsReducer from '../features/items/itemsSlice';
import playgroundReducer from '../features/playgrounds/playgroundSlice';
import plansReducer from '../features/plans/planSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      items: itemsReducer,
      plans: plansReducer,
      playground: playgroundReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
