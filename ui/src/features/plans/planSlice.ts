import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { v4 } from 'uuid';
import { isDemoMode, RootState } from '../../app/store';

import Plan from '../../lib/plan';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import { new_playground_path } from '../../routes/playgrounds/NewPlayground';
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
    try {
      const plan = new Plan(args.name, args.width, args.length);
      let id = v4();
      if (!isDemoMode()) {
        const jwt = selectJwt(getState() as RootState);
        const adapter = new PlanGraphqlAdapter(jwt);
        id = await adapter.create(plan);
      }

      plan.id = id;
      dispatch(create(PlanReduxAdapter.planToState(plan)));
      dispatch(setPlan(plan.id));
      dispatch(push(playground_path()));
    } catch (e) {
      console.error('Error in thunk plan/createPlan:', e);
    }
  }
);

export const deleteAllPlans = createAsyncThunk(
  'plan/deleteAllPlans',
  async (_: boolean, { dispatch, getState }) => {
    try {
      const jwt = selectJwt(getState() as RootState);
      const adapter = new PlanGraphqlAdapter(jwt);

      await adapter.deleteAll();

      dispatch(push(new_playground_path()));
    } catch (e) {
      console.error('ERROR IN THUNK plan/deleteAllPlans: ', e);
    }
  }
);

export default planSlice.reducer;
