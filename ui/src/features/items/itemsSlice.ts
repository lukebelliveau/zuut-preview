import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import PlanService from '../../lib/plan/planService';
import { selectDefaultPlan } from '../plans/planSelectors';
import { selectJwt } from '../users/userSelector';
import itemsAdapter from './itemsEntityAdapter';
import { itemsSelectors } from './itemsSelectors';
import { ItemState } from './itemState';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState(),
  reducers: {
    addOne: itemsAdapter.addOne,
    updateOne: itemsAdapter.updateOne,
    removeOne: itemsAdapter.removeOne,
  },
});

export const { addOne, updateOne } = itemsSlice.actions;

export const addItem = createAsyncThunk(
  'items/addItem',
  async (item: ItemState, { dispatch, getState }) => {
    dispatch(addOne(item));

    const state = getState() as RootState;
    const planService = new PlanService(state);
    return planService.syncCurrent();
  }
);

export const dropItem = createAsyncThunk(
  'items/dropItem',
  async (item: ItemState, { dispatch, getState }) => {
    dispatch(updateOne({ id: item.id, changes: item }));

    const state = getState() as RootState;
    const planService = new PlanService(state);
    return planService.syncCurrent();
  }
);

export const removeItem = createAsyncThunk(
  'items/removeItem',
  async (id: string, { dispatch, getState }) => {
    dispatch(itemsSlice.actions.removeOne(id));

    const state = getState() as RootState;
    const planService = new PlanService(state);
    return planService.syncCurrent();
  }
);

export const loadItems = createAsyncThunk(
  'items/loadItems',
  async (items: ItemState[], { dispatch }) => {
    items.forEach(itemState => dispatch(addOne(itemState)));
  }
);

export default itemsSlice.reducer;
