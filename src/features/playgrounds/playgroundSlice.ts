import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Size } from '../../lib/size';

import { PlaygroundState } from './playgroundState';

const initialState: PlaygroundState = {
  planId: '0',
  displayWidth: 1024,
  displayHeight: 768
};

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    setPlan: (state: PlaygroundState, action: PayloadAction<string>) => {
      state.planId = action.payload;
    },
    resize: (state: PlaygroundState, action: PayloadAction<Size>) => {
      state.displayWidth = action.payload.width;
      state.displayHeight = action.payload.length;
    }
  },
});

export const { setPlan, resize } = playgroundSlice.actions;

export default playgroundSlice.reducer;
