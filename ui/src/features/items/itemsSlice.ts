import { ActionCreators } from 'redux-undo';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import PlanService from '../../lib/plan/planService';
import itemsAdapter from './itemsEntityAdapter';
import { ItemState } from './itemState';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState(),
  reducers: {
    addOne: itemsAdapter.addOne,
    addOneWithoutHistory: itemsAdapter.addOne,
    updateOne: itemsAdapter.updateOne,
    updateOneWithoutHistory: itemsAdapter.updateOne,
    removeOne: itemsAdapter.removeOne,
  },
});

export const {
  addOne,
  addOneWithoutHistory,
  updateOne,
  updateOneWithoutHistory,
  removeOne,
} = itemsSlice.actions;

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
    dispatch(removeOne(id));

    const state = getState() as RootState;
    const planService = new PlanService(state);
    return planService.syncCurrent();
  }
);

export const undoItemAction = createAsyncThunk(
  'items/undoItems',
  async (_, { dispatch, getState }) => {
    dispatch(ActionCreators.undo());

    const state = getState() as RootState;
    const planService = new PlanService(state);
    return planService.syncCurrent();
  }
);

export const redoItemAction = createAsyncThunk(
  'items/redoItems',
  async (_, { dispatch, getState }) => {
    dispatch(ActionCreators.redo());

    const state = getState() as RootState;
    const planService = new PlanService(state);
    return planService.syncCurrent();
  }
);

export const loadItems = createAsyncThunk(
  'items/loadItems',
  async (items: ItemState[], { dispatch }) => {
    items.forEach((itemState) => dispatch(addOne(itemState)));
    dispatch(ActionCreators.clearHistory());
  }
);

export default itemsSlice.reducer;
