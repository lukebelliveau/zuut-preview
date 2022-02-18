import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/rootState';
import Plan from '../../lib/plan';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import { create } from '../plans/planSlice';
import { PlanState } from '../plans/planState';

import { PlaygroundState } from './playgroundState';

const initialState: PlaygroundState = {
  planId: '0',
  displayWidth: 10,
  displayHeight: 10,
  centerX: 0,
  centerY: 0,
  scale: 1,
};

export const setupInitialPLayground = createAsyncThunk(
  'playground/setupInitialPlayground',
  async (jwt: string, { dispatch, getState }) => {
    const state: RootState = getState() as RootState;
    if (!state.playground.planId) return;
  
    const plan = new Plan();
    const planState = PlanReduxAdapter.planToState(plan);

    dispatch(create(planState));
    dispatch(setPlan(plan.id));

    const adapter = new PlanGraphqlAdapter(jwt);
    return adapter.save(planState);
  }
);

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    update: (
      state: PlaygroundState,
      action: PayloadAction<PlaygroundState>
    ) => {
      state.displayHeight = action.payload.displayHeight;
      state.displayWidth = action.payload.displayWidth;
      state.planId = action.payload.planId;
      state.scale = action.payload.scale;
    },
    resize: (
      state: PlaygroundState,
      action: PayloadAction<PlaygroundState>
    ) => {
      state.displayWidth = action.payload.displayWidth;
      state.displayHeight = action.payload.displayHeight;
      state.scale = action.payload.scale;
    },
    setPlan: (
      state: PlaygroundState,
      action: PayloadAction<string>
    ) => {
      state.planId = action.payload;
    },
    zoom: (state: PlaygroundState, action: PayloadAction<PlaygroundState>) => {
      state.centerX = action.payload.centerX;
      state.centerY = action.payload.centerY;
      state.scale = action.payload.scale;
    },
  },
});

export const { update, resize, setPlan, zoom } = playgroundSlice.actions;

export default playgroundSlice.reducer;
