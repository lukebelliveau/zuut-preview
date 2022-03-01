import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from '../../app/store';

import Plan from '../../lib/plan';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import { playground_path } from '../../routes/playgrounds/ShowPlayground';
import { setPlan } from '../playgrounds/playgroundSlice';
import { selectJwt } from '../users/userSelector';
import planAdapter from './planEntityAdapter';

export const planSlice = createSlice({
  name: 'plan',
  initialState: planAdapter.getInitialState(),
  reducers: {
    create: planAdapter.addOne,
    update: planAdapter.updateOne,
  },
});

export const { create, update } = planSlice.actions;

interface CreatePlanPayload {
  name: string;
  width: number;
  length: number;
}

export const createPlan = createAsyncThunk(
  'plan/createPlan',
  async (args: CreatePlanPayload, { dispatch, getState }) => {
    const jwt = selectJwt(getState() as RootState);
    const adapter = new PlanGraphqlAdapter(jwt);

    const plan = new Plan(args.name, args.width, args.length);
    const id = await adapter.create(plan);
    plan.id = id;
    dispatch(create(PlanReduxAdapter.planToState(plan)));
    dispatch(setPlan(plan.id));
    dispatch(push(playground_path()));
  }
);

export default planSlice.reducer;
