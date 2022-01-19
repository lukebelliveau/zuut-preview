import { createSlice } from '@reduxjs/toolkit';

import planAdapter from './planEntityAdapter';

export const planSlice = createSlice({
  name: 'plan',
  initialState: planAdapter.getInitialState(),
  reducers: {
    create: planAdapter.addOne,
    update: planAdapter.updateOne
  },
});

export const { create, update } = planSlice.actions;

export default planSlice.reducer;
