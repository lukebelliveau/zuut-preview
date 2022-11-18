import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
// import { mixpanelEvents } from '../../analytics/mixpanelEvents';
// import { mixpanelTrack } from '../../analytics/mixpanelTrack';

import { dispatch, isDemoMode, RootState } from '../../store';
import { assertDefined } from '../../../lib/assert';
import { feetToMm } from '../../../lib/conversions';
import ItemReduxAdapter from '../../../lib/item/itemReduxAdapter';
import { loadJwt } from '../../../lib/jwt';
import Plan from '../../../lib/plan';
import PlanGraphqlAdapter from '../../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../../lib/plan/planReduxAdapter';
import PlaygroundReduxAdapter from '../../../lib/playground/playgroundReduxAdapter';
// import { new_playground_path, reset_playground_path } from '../../routes/playgrounds/NewPlayground';
// import { playground_path } from '../../routes/playgrounds/ShowPlayground';
import { addMany, loadItems } from '../items/itemsSlice';
import { selectDefaultPlan } from '../plans/planSelectors';
import { create } from '../plans/planSlice';
import { selectPlaygroundState } from './playgroundSelector';

import { PlaygroundState } from './playgroundState';
import waitForElement from './waitForElement';
import { PATH_PLAYGROUND } from 'src/routes/paths';
import { INVENTORY } from 'src/config';
import { Navigate } from 'react-router-dom';
import { setAllProducts } from '../cart/cartSlice';

const initialState: PlaygroundState = {
  planId: '0',
  displayWidth: 10,
  displayHeight: 9999,
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
      dispatch(push(PATH_PLAYGROUND.general.new));
      return;
    }

    const adapter = new PlanGraphqlAdapter(jwt);
    const plan = await adapter.current();

    if (plan) {
      dispatch(push(PATH_PLAYGROUND.general.current));
    } else {
      dispatch(push(PATH_PLAYGROUND.general.new));
    }
  }
);

export const loadCurrentPlaygroundIfPresent = createAsyncThunk(
  'playground/loadCurrentPlaygroundIfPresent',
  async (_: boolean, { dispatch, getState }) => {
    const state = getState() as RootState;
    const jwt = state.user.jwt || loadJwt();

    if (!jwt) {
      dispatch(push(PATH_PLAYGROUND.general.new));
      return;
    }

    const adapter = new PlanGraphqlAdapter(jwt);
    const plan = await adapter.current();

    if (plan) {
      dispatch(push(PATH_PLAYGROUND.general.current));
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
      // console.error('ERROR IN THUNK playground/loadSavedPlayground:', e);
      // console.log('Resetting playground...');
      // mixpanelTrack(mixpanelEvents.ERROR, {
      //   error: e,
      //   errorMessage: e.message,
      //   errorJson: JSON.stringify(e),
      //   info: "Couldn't load playground in playground/loadSavedPlayground. Resetting plans.",
      // });
      dispatch(push(PATH_PLAYGROUND.general.reset));
    }
  }
);

export const resizePlayground = createAsyncThunk(
  'playground/resizePlayground',
  async (_, { dispatch, getState }) => {
    try {
      const sandbox = await waitForElement('#sandbox');
      const toolbar = await waitForElement('#horizontal-toolbar');

      const playgroundState = selectPlaygroundState(getState() as RootState);
      const planState = selectDefaultPlan(getState() as RootState);
      const playground = PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);

      /**
       * i called this UNSAFE because it's hacking around the fact that it
       * doesn't need a width/height in the first place, and the app crashes
       * if it looks for a #sandbox and can't find it
       *
       * (it's a hack, fix this TODO)
       *
       * leaving the full if/then here so it's legible for me.
       * the default is "sandbox/toolbar exist",
       * it just doesn't exist if you start a new session and open a new playground
       * (to re-pro: click "Demo" from the landing page in a brand new fresh browser)
       * (force close the browser, and re-open it in a private window)
       */
      let UNSAFE_sandboxOffsetWidth = 100;
      let UNSAFE_sandboxOffsetHeight = 100;
      let UNSAFE_toolbarOffsetHeight = 100;

      if (!sandbox) {
        UNSAFE_sandboxOffsetHeight = 100;
        UNSAFE_sandboxOffsetWidth = 100;
      } else if (sandbox.offsetHeight === 0 || sandbox.offsetHeight <= toolbar.offsetHeight) {
        UNSAFE_sandboxOffsetHeight = 100;
        UNSAFE_sandboxOffsetWidth = 100;
      } else {
        UNSAFE_sandboxOffsetHeight = sandbox.offsetHeight;
        UNSAFE_sandboxOffsetWidth = sandbox.offsetWidth;
      }

      if (!toolbar) {
        UNSAFE_toolbarOffsetHeight = 100;
      } else {
        UNSAFE_toolbarOffsetHeight = toolbar.offsetHeight;
      }

      playground.setDisplayDimensions(
        UNSAFE_sandboxOffsetWidth - INVENTORY.BASE_WIDTH,
        UNSAFE_sandboxOffsetHeight - UNSAFE_toolbarOffsetHeight - 10
      );

      playground.centerX = 10;
      playground.centerY = 10;

      dispatch(
        playgroundSlice.actions.resize(PlaygroundReduxAdapter.playgroundToState(playground))
      );
    } catch (e) {
      // console.error('ERROR in thunk playground/resizePlayground:', e);
    }
  }
);

export const createDemoPlan = createAsyncThunk(
  'playground/createDemoPlan',
  async (_, { dispatch }) => {
    const plan = new Plan('Demo Playground', feetToMm(15), feetToMm(10));
    const planState = PlanReduxAdapter.planToState(plan);
    dispatch(create(planState));
    dispatch(setPlan(planState.id));
    dispatch(resizePlayground());
  }
);

/**
 * A gross hack to re-center the Playground (Konva stage)
 * Slightly changing a value on playground causes the ShowPlayground
 * component to re-render, which will re-center the grid. Sorry...
 */
export const hackyRecenterPlayground = createAsyncThunk(
  'playground/hackyRecenterPlayground',
  async (_, { dispatch, getState }) => {
    const playgroundState = selectPlaygroundState(getState() as RootState);
    let planState;
    if (isDemoMode()) {
      planState = selectDefaultPlan(getState() as RootState);
    } else {
      const state = getState() as RootState;
      const jwt = state.user.jwt || loadJwt();

      if (!jwt) {
        dispatch(push(PATH_PLAYGROUND.general.new));
        return;
      }

      const adapter = new PlanGraphqlAdapter(jwt);
      planState = await adapter.current();
    }

    const playground = PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);
    const displayWidth = playground.displayWidth;
    playground.displayWidth = displayWidth - 1;
    dispatch(update(PlaygroundReduxAdapter.playgroundToState(playground)));
    dispatch(resizePlayground());
  }
);

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
    resize(state: PlaygroundState, action: PayloadAction<PlaygroundState>) {
      state.displayWidth = action.payload.displayWidth;
      state.displayHeight = action.payload.displayHeight;
      state.centerX = action.payload.centerX;
      state.centerY = action.payload.centerY;
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
