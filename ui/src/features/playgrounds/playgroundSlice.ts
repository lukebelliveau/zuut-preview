import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from '../../app/store';
import { assertDefined } from '../../lib/assert';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { loadJwt } from '../../lib/jwt';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import { new_playground_path } from '../../routes/playgrounds/NewPlayground';
import { playground_path } from '../../routes/playgrounds/ShowPlayground';
import { loadItems } from '../items/itemsSlice';
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

export const getStarted = createAsyncThunk(
  'playground/getStarted',
  async (_: boolean, { dispatch, getState }) => {
    const state = getState() as RootState;
    const jwt = state.user.jwt || loadJwt();

    if (!jwt) {
      dispatch(push(new_playground_path()));
      return;
    }

    const adapter = new PlanGraphqlAdapter(jwt);
    const plan = await adapter.current();

    if (plan) {
      dispatch(push(playground_path()));
    } else {
      dispatch(push(new_playground_path()));
    }
  }
);

export const loadCurrentPlaygroundIfPresent = createAsyncThunk(
  'playground/loadCurrentPlaygroundIfPresent',
  async (_: boolean, { dispatch, getState }) => {
    const state = getState() as RootState;
    const jwt = state.user.jwt || loadJwt();

    if (!jwt) {
      dispatch(push(new_playground_path()));
      return;
    }

    const adapter = new PlanGraphqlAdapter(jwt);
    const plan = await adapter.current();

    if (plan) {
      dispatch(push(playground_path()));
    }
  }
);

export const loadSavedPlayground = createAsyncThunk(
  'playground/loadSavedPlayground',
  async (jwt: string, { dispatch }) => {
    const adapter = new PlanGraphqlAdapter(jwt);
    const plan = assertDefined(await adapter.current());

    dispatch(create(PlanReduxAdapter.planToState(plan)));
    dispatch(loadItems(plan.items.map(ItemReduxAdapter.itemToState)));
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
    const playground = PlaygroundReduxAdapter.playgroundFromState(
      planState,
      playgroundState
    );

    playground.setDisplayDimensions(sandbox.offsetWidth, sandbox.offsetHeight);

    dispatch(
      playgroundSlice.actions.resize(
        PlaygroundReduxAdapter.playgroundToState(playground)
      )
    );
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
    setPlan: (state: PlaygroundState, action: PayloadAction<string>) => {
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
