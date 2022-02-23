import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InteractionsState } from './interactionsState';

const initialState: InteractionsState = {
  selected: undefined,
};

export const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    select: (state: InteractionsState, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    toggleSelect: (state: InteractionsState, action: PayloadAction<string>) => {
      if (action.payload === state.selected) {
        state.selected = undefined;
      } else {
        state.selected = action.payload;
      }
    },
    unselect: (state: InteractionsState) => {
      state.selected = undefined;
    },
  },
});

export const { select, toggleSelect, unselect } = interactionsSlice.actions;
export default interactionsSlice.reducer;
