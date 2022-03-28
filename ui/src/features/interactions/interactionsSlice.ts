import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InteractionsState } from './interactionsState';

const initialState: InteractionsState = {
  selected: [],
};

export const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    select: (state: InteractionsState, action: PayloadAction<string>) => {
      if (state.selected.length === 1 && state.selected[0] === action.payload) {
        state.selected = [];
      } else {
        state.selected = [action.payload];
      }
    },
    selectMany: (state: InteractionsState, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },
    toggleSelect: (state: InteractionsState, action: PayloadAction<string>) => {
      if (state.selected?.includes(action.payload)) {
        state.selected = state.selected.filter((id) => id !== action.payload);
      } else {
        state.selected.push(action.payload);
      }
    },
    unselect: (state: InteractionsState, action: PayloadAction<string>) => {
      state.selected = state.selected.filter((id) => id !== action.payload);
    },
    unselectAll: (state: InteractionsState) => {
      state.selected = [];
    },
  },
});

export const { select, toggleSelect, unselect, unselectAll, selectMany } =
  interactionsSlice.actions;
export default interactionsSlice.reducer;
