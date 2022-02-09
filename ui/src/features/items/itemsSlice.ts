import { createSlice } from '@reduxjs/toolkit';
import itemsAdapter from './itemsEntityAdapter';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState(),
  reducers: {
    addOne: itemsAdapter.addOne,
    updateOne: itemsAdapter.updateOne,
    removeOne: itemsAdapter.removeOne,
  },
});

export const { addOne, updateOne, removeOne } = itemsSlice.actions;

export default itemsSlice.reducer;
