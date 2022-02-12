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
  },
});

export const { select, toggleSelect } = interactionsSlice.actions;
export default interactionsSlice.reducer;
