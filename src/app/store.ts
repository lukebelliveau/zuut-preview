import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { resizePlaygroundOnWindowResize } from '../features/playgroundPlan/playgroundPlanEffects';

import playgroundPlanReducer from '../features/playgroundPlan/playgroundPlanSlice';

export const store = configureStore({
  reducer: {
    playgroundPlan: playgroundPlanReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

window.addEventListener('resize', () => { resizePlaygroundOnWindowResize(store); });

export type AppDispatch = typeof store.dispatch;
