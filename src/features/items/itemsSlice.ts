import { createSlice } from '@reduxjs/toolkit';
import itemsAdapter from './itemsEntityAdapter';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState(),
  reducers: {
    addOne: itemsAdapter.addOne,
    updateOne: itemsAdapter.updateOne,
  },
});

export const { addOne, updateOne } = itemsSlice.actions;

export default itemsSlice.reducer;
