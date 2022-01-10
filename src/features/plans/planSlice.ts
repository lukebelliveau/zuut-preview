import { createSlice } from '@reduxjs/toolkit';

import planAdapter from './planReduxAdapter';

export const planSlice = createSlice({
  name: 'plan',
  initialState: planAdapter.getInitialState(),
  reducers: {
    create: planAdapter.addOne,
  },
});

export const { create } = planSlice.actions;

export default planSlice.reducer;
