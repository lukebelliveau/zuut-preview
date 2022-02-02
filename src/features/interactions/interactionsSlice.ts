import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { feetToMm } from '../../lib/conversions';
import { InteractionsState } from './interactionsState';

export const interactionsInitialState: () => InteractionsState = () => ({
  drag: null,
  snap: {
    interval: feetToMm(0.5),
    enabled: true,
  },
});

export interface DragState {
  id: string;
  x: number;
  y: number;
}

export const interactionsSlice = createSlice({
  name: 'interactions',
  initialState: interactionsInitialState(),
  reducers: {
    moveDrag: (state: InteractionsState, action: PayloadAction<DragState>) => {
      state.drag = action.payload;
    },
    endDrag: (state: InteractionsState) => {
      state.drag = null;
    },
    enableSnap: (state: InteractionsState) => {
      state.snap.enabled = true;
    },
    disableSnap: (state: InteractionsState) => {
      state.snap.enabled = false;
    },
    setSnapInterval: (
      state: InteractionsState,
      action: PayloadAction<number>
    ) => {
      state.snap.interval = action.payload;
    },
  },
});

export const { moveDrag, endDrag, enableSnap, disableSnap, setSnapInterval } =
  interactionsSlice.actions;
export default interactionsSlice.reducer;
