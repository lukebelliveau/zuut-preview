import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Layer } from '../../lib/layer';
import { InteractionsState } from './interactionsState';

const initialState: InteractionsState = {
  selected: [],
  showLayer: {
    [Layer.FLOOR]: true,
    [Layer.CEILING]: true,
    [Layer.BOTH]: true,
  },
};

export const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    // select: (state: InteractionsState, action: PayloadAction<string>) => {
    //   if (state.selected.length === 1 && state.selected[0] === action.payload) {
    //     state.selected = [];
    //   } else {
    //     state.selected = [action.payload];
    //   }
    // },
    select: (state: InteractionsState, action: PayloadAction<string>) => {
      state.selected = [action.payload];
    },
    selectOrDeselectAllIfSelected: (
      state: InteractionsState,
      action: PayloadAction<string>
    ) => {
      if (state.selected?.includes(action.payload)) {
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
    toggleLayer(state: InteractionsState, action: PayloadAction<Layer>) {
      if (action.payload === Layer.BOTH) return;
      state.showLayer[action.payload] = !state.showLayer[action.payload];
    },
    setVisibleLayer(state: InteractionsState, action: PayloadAction<Layer>) {
      state.showLayer[action.payload] = true;
    },
  },
});

export const {
  select,
  toggleSelect,
  unselect,
  unselectAll,
  selectMany,
  toggleLayer,
  setVisibleLayer,
  selectOrDeselectAllIfSelected,
} = interactionsSlice.actions;
export default interactionsSlice.reducer;
