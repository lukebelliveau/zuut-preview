import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import planAdapter from './planEntityAdapter';
import { PlanState } from './planState';

export const createPlan = createAsyncThunk(
  'plans/createPlan',
  async (planState: PlanState, { dispatch }): Promise<PlanState> => {
    dispatch(planSlice.actions.create(planState));
    return planState;
  }
);

export const planSlice = createSlice({
  name: 'plan',
  initialState: planAdapter.getInitialState(),
  reducers: {
    create: planAdapter.addOne,
    update: planAdapter.updateOne,
  }
});

export const { create, update } = planSlice.actions;

export default planSlice.reducer;
