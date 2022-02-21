import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/rootState';
import Plan from '../../lib/plan';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import { selectDefaultPlan } from '../plans/planSelectors';
import { create } from '../plans/planSlice';
import { selectPlaygroundState } from './playgroundSelector';

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
  async (jwt: string, { dispatch }) => {
    const plan = new Plan();
    const planState = PlanReduxAdapter.planToState(plan);

    dispatch(create(planState));
    dispatch(setPlan(plan.id));
  }
);

export const loadSavedPlayground = createAsyncThunk(
  'playground/loadSavedPlayground',
  async (jwt: string, { dispatch }) => {
    const adapter = new PlanGraphqlAdapter(jwt);
    const plan = await adapter.current();

    dispatch(create(PlanReduxAdapter.planToState(plan)));
    dispatch(setPlan(plan.id));
    dispatch(resizePlayground());
  }
);

export const resizePlayground = createAsyncThunk(
  'playground/resizePlayground',
  async (_, { dispatch, getState }) => {
    const sandbox = window.document.getElementById('sandbox');
    if (!sandbox) return;

    const playgroundState = selectPlaygroundState(getState() as RootState);
    const planState = selectDefaultPlan(getState() as RootState);
    const playground = PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);

    playground.setDisplayDimensions(sandbox.offsetWidth, sandbox.offsetHeight);

    dispatch(playgroundSlice.actions.resize(PlaygroundReduxAdapter.playgroundToState(playground)));
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

export const { update, setPlan, zoom } = playgroundSlice.actions;

export default playgroundSlice.reducer;
