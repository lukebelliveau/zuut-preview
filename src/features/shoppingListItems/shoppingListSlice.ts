import { createSlice } from '@reduxjs/toolkit';

import shoppingListAdapter from './shoppingListEntityAdapter';

export const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: shoppingListAdapter.getInitialState(),
  reducers: {
    create: shoppingListAdapter.addOne,
  },
});

export const { create } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
