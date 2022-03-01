import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import PlanGraphqlAdapter from '../../lib/plan/planGraphqlAdapter';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
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

export const { addOne, updateOne, removeOne } = itemsSlice.actions;

export const addItem = createAsyncThunk(
  'items/addItem',
  async (item: ItemState, { dispatch, getState }) => {
    dispatch(addOne(item));
    
    const state = getState() as RootState;
    const jwt = selectJwt(state);
    const planState = selectDefaultPlan(state);
    const itemListState = itemsSelectors.selectAll(state);
    const plan = PlanReduxAdapter.stateToPlan(planState, itemListState);

    const adapter = new PlanGraphqlAdapter(jwt);
    return adapter.update(plan);
  }
);

export default itemsSlice.reducer;
