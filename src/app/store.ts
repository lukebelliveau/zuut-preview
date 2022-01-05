import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import playgroundPlanReducer from '../features/playgroundPlan/playgroundPlanSlice';

export const store = configureStore({
  reducer: {
    playgroundPlan: playgroundPlanReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
