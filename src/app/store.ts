import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import itemsReducer from '../features/items/itemsSlice';
import playgroundReducer from '../features/playgrounds/playgroundSlice';
import plansReducer from '../features/plans/planSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    plans: plansReducer,
    playground: playgroundReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
