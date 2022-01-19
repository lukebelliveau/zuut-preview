import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { resizePlaygroundOnWindowResize } from '../features/playgrounds/playgroundEffects';

import playgroundReducer from '../features/playgrounds/playgroundSlice';
import plansReducer from '../features/plans/planSlice';

export const store = configureStore({
  reducer: {
    plans: plansReducer,
    playground: playgroundReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

window.addEventListener('resize', () => { resizePlaygroundOnWindowResize(); });

export type AppDispatch = typeof store.dispatch;
