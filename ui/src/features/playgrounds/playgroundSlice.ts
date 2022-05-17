import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { mixpanelEvents } from '../../analytics/mixpanelEvents';
import { mixpanelTrack } from '../../analytics/mixpanelTrack';

import { AppDispatch, RootState } from '../../app/store';
import { assertDefined } from '../../lib/assert';
import { feetToMm } from '../../lib/conversions';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { loadJwt } from '../../lib/jwt';
import Plan from '../../lib/plan';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import {
  new_playground_path,
  reset_playground_path,
} from '../../routes/playgrounds/NewPlayground';
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
  centerX: 10,
  centerY: 10,
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
    try {
      const adapter = new PlanGraphqlAdapter(jwt);
      const plan = assertDefined(await adapter.current());

      dispatch(create(PlanReduxAdapter.planToState(plan)));
      dispatch(loadItems(plan.items.map(ItemReduxAdapter.itemToState)));
      dispatch(setPlan(plan.id));
      dispatch(resizePlayground());
    } catch (e: any) {
      console.error('ERROR IN THUNK playground/loadSavedPlayground:', e);
      console.log('Resetting playground...');
      mixpanelTrack(mixpanelEvents.ERROR, {
        error: e,
        errorMessage: e.message,
        errorJson: JSON.stringify(e),
        info: "Couldn't load playground in playground/loadSavedPlayground. Resetting plans.",
      });
      dispatch(push(reset_playground_path()));
    }
  }
);

export const resizePlayground = createAsyncThunk(
  'playground/resizePlayground',
  async (_, { dispatch, getState }) => {
    try {
      const sandbox = window.document.getElementById('sandbox');
      const toolbar = window.document.getElementById('toolbar');
      if (!sandbox || !toolbar)
        throw new Error(
          `tried to resize playground but couldn't find sandbox or toolbar:
          sandbox: ${sandbox} toolbar: ${toolbar}`
        );

      const playgroundState = selectPlaygroundState(getState() as RootState);
      const planState = selectDefaultPlan(getState() as RootState);
      const playground = PlaygroundReduxAdapter.playgroundFromState(
        planState,
        playgroundState
      );

      playground.setDisplayDimensions(
        sandbox.offsetWidth,
        sandbox.offsetHeight - toolbar.offsetHeight
      );

      dispatch(
        playgroundSlice.actions.resize(
          PlaygroundReduxAdapter.playgroundToState(playground)
        )
      );
    } catch (e) {
      console.error('ERROR in thunk playground/resizePlayground:', e);
    }
  }
);

export const createDemoPlan = (dispatch: AppDispatch) => {
  const planState = new Plan('Demo Playground', feetToMm(50), feetToMm(50));
  const plan = PlanReduxAdapter.planToState(planState);
  dispatch(create(plan));
  dispatch(setPlan(plan.id));
  dispatch(resizePlayground());
};

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    update(state: PlaygroundState, action: PayloadAction<PlaygroundState>) {
      state.displayHeight = action.payload.displayHeight;
      state.displayWidth = action.payload.displayWidth;
      state.planId = action.payload.planId;
      state.scale = action.payload.scale;
    },
    // toggleLayer(state: PlaygroundState, action: PayloadAction<Layer>) {
    //   if (action.payload === Layer.BOTH) return;
    //   state.showLayer[action.payload] = !state.showLayer[action.payload];
    // },
    // setVisibleLayer(state: PlaygroundState, action: PayloadAction<Layer>) {
    //   state.showLayer[action.payload] = true;
    // },
    resize(state: PlaygroundState, action: PayloadAction<PlaygroundState>) {
      state.displayWidth = action.payload.displayWidth;
      state.displayHeight = action.payload.displayHeight;
      state.scale = action.payload.scale;
    },
    setPlan(state: PlaygroundState, action: PayloadAction<string>) {
      state.planId = action.payload;
    },
    zoom(state: PlaygroundState, action: PayloadAction<PlaygroundState>) {
      state.centerX = action.payload.centerX;
      state.centerY = action.payload.centerY;
      state.scale = action.payload.scale;
    },
  },
});

export const {
  // setVisibleLayer, toggleLayer,
  update,
  setPlan,
  zoom,
} = playgroundSlice.actions;

export default playgroundSlice.reducer;
