import { ActionCreators } from 'redux-undo';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';
import PlanService from '../../../lib/plan/planService';
import itemsAdapter from './itemsEntityAdapter';
import { ItemState } from './itemState';
import { itemsSelectors } from './itemsSelectors';
import ItemReduxAdapter from '../../../lib/item/itemReduxAdapter';
import PlaceableItem, { isPlaceableItem } from '../../../lib/item/placeableItem';
import ModifierItem from '../../../lib/item/modifierItem';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState(),
  reducers: {
    addOne: itemsAdapter.addOne,
    addOneWithoutHistory: itemsAdapter.addOne,
    addMany: itemsAdapter.addMany,
    updateOne: itemsAdapter.updateOne,
    updateOneWithoutHistory: itemsAdapter.updateOne,
    removeOne: itemsAdapter.removeOne,
    removeOneWithoutHistory: itemsAdapter.removeOne,
    removeMany: itemsAdapter.removeMany,
    removeManyWithoutHistory: itemsAdapter.removeMany,
    removeAll: itemsAdapter.removeAll,
  },
});

export const {
  addOne,
  addOneWithoutHistory,
  addMany,
  updateOne,
  updateOneWithoutHistory,
  removeOne,
  removeOneWithoutHistory,
  removeMany,
  removeManyWithoutHistory,
  removeAll,
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

export const removeAllItems = createAsyncThunk(
  'items/removeAllItems',
  async (_: boolean, { dispatch, getState }) => {
    dispatch(removeAll());

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
    try {
      const itemState = itemsSelectors.selectById(getState() as RootState, id);
      if (!itemState) throw new Error('Item not found');
      const item = ItemReduxAdapter.stateToItem(itemState);

      if (isPlaceableItem(item)) {
        if (item.modifiers) {
          let modifierIds: string[] = [];

          Object.values(item.modifiers).forEach((modifierCategory) => {
            modifierCategory.forEach((modifierId: string) => {
              modifierIds.push(modifierId);
            });
          });

          dispatch(removeMany(modifierIds));
        }

        item.removeAllModifiers();
      }

      dispatch(
        updateOneWithoutHistory({
          id: item.id,
          changes: ItemReduxAdapter.itemToState(item),
        })
      );

      dispatch(removeOneWithoutHistory(id));

      const state = getState() as RootState;
      const planService = new PlanService(state);
      return planService.syncCurrent();
    } catch (e: any) {
      if (e.message === 'No JWT set' && process.env.NODE_ENV === 'test') {
        return;
      } else {
        console.error('Error in thunk items/removeItem:', e);
      }
    }
  }
);

export const removeItemWithoutHistory = createAsyncThunk(
  'items/removeItemWithoutHistory',
  async (id: string, { dispatch, getState }) => {
    try {
      const itemState = itemsSelectors.selectById(getState() as RootState, id);
      if (!itemState) throw new Error('Item not found');
      const item = ItemReduxAdapter.stateToItem(itemState);

      if (isPlaceableItem(item)) {
        if (item.modifiers) {
          let modifierIds: string[] = [];

          Object.values(item.modifiers).forEach((modifierCategory) => {
            modifierCategory.forEach((modifierId: string) => {
              modifierIds.push(modifierId);
            });
          });

          dispatch(removeManyWithoutHistory(modifierIds));
        }

        item.removeAllModifiers();
      }

      dispatch(
        updateOneWithoutHistory({
          id: item.id,
          changes: ItemReduxAdapter.itemToState(item),
        })
      );

      dispatch(removeOneWithoutHistory(id));

      const state = getState() as RootState;
      const planService = new PlanService(state);
      return planService.syncCurrent();
    } catch (e: any) {
      if (e.message === 'No JWT set' && process.env.NODE_ENV === 'test') {
        return;
      } else {
        console.error('Error in thunk items/removeItemWithoutHistory:', e);
      }
    }
  }
);

export const removeItems = createAsyncThunk(
  'items/removeItems',
  async (ids: string[], { dispatch, getState }) => {
    try {
      ids.forEach(async (id) => {
        dispatch(removeItemWithoutHistory(id));
      });

      const state = getState() as RootState;
      const planService = new PlanService(state);
      return planService.syncCurrent();
    } catch (e: any) {
      if (e.message === 'No JWT set' && process.env.NODE_ENV === 'test') {
        return;
      } else {
        console.error('Error in thunk items/removeItems:', e);
      }
    }
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

export const rotate = createAsyncThunk(
  'items/rotate',
  async (itemId: string, { dispatch, getState }) => {
    const itemState = itemsSelectors.selectById(getState() as RootState, itemId);
    if (!itemState) throw new Error('Item not found');

    const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;
    item.rotate();
    dispatch(updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) }));

    const state = getState() as RootState;
    const planService = new PlanService(state);
    return planService.syncCurrent();
  }
);

export const incrementModifier = createAsyncThunk(
  'items/incrementModifier',
  async (
    { itemId, modifierName }: { itemId: string; modifierName: string },
    { dispatch, getState }
  ) => {
    try {
      const itemState = itemsSelectors.selectById(getState() as RootState, itemId);
      if (!itemState) throw new Error('Item not found');
      const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;

      const modifier = new ModifierItem({ name: modifierName });
      dispatch(addItem(ItemReduxAdapter.itemToState(modifier)));

      item.addModifier(modifier);

      dispatch(updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) }));
      const state = getState() as RootState;
      const planService = new PlanService(state);
      return planService.syncCurrent();
    } catch (e) {
      console.error('Error in thunk items/addModifer:', e);
    }
  }
);

export const decrementModifier = createAsyncThunk(
  'items/decrementModifier',
  async (
    { itemId, modifierName }: { itemId: string; modifierName: string },
    { dispatch, getState }
  ) => {
    const itemState = itemsSelectors.selectById(getState() as RootState, itemId);
    if (!itemState) throw new Error('Item not found');
    const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;

    const idOfModifierToRemove = item.modifiers[modifierName][0];

    const modifier = itemsSelectors.selectById(getState() as RootState, idOfModifierToRemove);

    if (!modifier) throw new Error('Attempted to remove modifier, no modifier found');

    dispatch(removeOne(idOfModifierToRemove));
    item.removeModifier(ItemReduxAdapter.stateToItem(modifier) as ModifierItem);

    dispatch(updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) }));
    const state = getState() as RootState;
    const planService = new PlanService(state);
    return planService.syncCurrent();
  }
);

export default itemsSlice.reducer;
