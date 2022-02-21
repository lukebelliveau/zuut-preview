import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/rootState';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import { selectJwt } from '../users/userSelector';

import planAdapter from './planEntityAdapter';
import { selectDefaultPlan } from './planSelectors';

export const planSlice = createSlice({
  name: 'plan',
  initialState: planAdapter.getInitialState(),
  reducers: {
    create: planAdapter.addOne,
    update: planAdapter.updateOne,
  }
});

export const { create, update } = planSlice.actions;

interface SetDimensionsPayload {
  width: number;
  length: number;
}

export const setDimentions = createAsyncThunk(
  'plan/setDimensions',
  async (args: SetDimensionsPayload, { dispatch, getState }) => {
    const jwt = selectJwt(getState() as RootState);
    const planState = selectDefaultPlan(getState() as RootState);

    const plan = PlanReduxAdapter.stateToPlan(planState);
    plan.setDimensions(args.width, args.length);

    dispatch(update({ id: plan.id, changes: PlanReduxAdapter.planToState(plan) }));

    const adapter = new PlanGraphqlAdapter(jwt);
    return adapter.create(plan);
  }
);

export default planSlice.reducer;
