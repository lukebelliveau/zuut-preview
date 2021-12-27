import { configureStore } from "@reduxjs/toolkit";
import playgroundReducer from "../features/playground/playgroundSlice";

export const store = configureStore({
  reducer: {
    counter: playgroundReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
