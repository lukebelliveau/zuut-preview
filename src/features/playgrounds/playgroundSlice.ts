import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlaygroundState } from './playgroundState';

const initialState: PlaygroundState = {
  planId: '0',
  displayWidth: 10,
  displayHeight: 10,
  centerX: 0,
  centerY: 0,
  scale: 1
};

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    update: (state: PlaygroundState, action: PayloadAction<PlaygroundState>) => {
      state.displayHeight = action.payload.displayHeight;
      state.displayWidth = action.payload.displayWidth;
      state.planId = action.payload.planId;
      state.scale = action.payload.scale;
    },
    resize: (state: PlaygroundState, action: PayloadAction<PlaygroundState>) => {
      state.displayWidth = action.payload.displayWidth;
      state.displayHeight = action.payload.displayHeight;
      state.scale = action.payload.scale;
    },
    zoom: (state: PlaygroundState, action: PayloadAction<PlaygroundState>) => {
      state.centerX = action.payload.centerX;
      state.centerY = action.payload.centerY;
      state.scale = action.payload.scale;
    }
  },
});

export const { update, resize, zoom } = playgroundSlice.actions;

export default playgroundSlice.reducer;
