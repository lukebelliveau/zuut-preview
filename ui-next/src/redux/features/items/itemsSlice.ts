import { ActionCreators } from 'redux-undo';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';
import PlanService from '../../../lib/plan/planService';
import itemsAdapter from './itemsEntityAdapter';
import { ItemState } from './itemState';
import { itemsSelectors } from './itemsSelectors';
import ItemReduxAdapter from '../../../lib/item/itemReduxAdapter';
import PlaceableItem, {
  isPlaceableItem,
  Modifier,
} from '../../../lib/item/placeableItem';
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
  }
);

export const removeAllItems = createAsyncThunk(
  'items/removeAllItems',
  async (_: boolean, { dispatch, getState }) => {
    dispatch(removeAll());
  }
);

export const dropItem = createAsyncThunk(
  'items/dropItem',
  async (item: ItemState, { dispatch, getState }) => {
    dispatch(updateOne({ id: item.id, changes: item }));
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

          Object.values(item.modifiers).forEach((modifier) => {
            modifier.ids.forEach((modifierId: string) => {
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
    } catch (e: any) {
      if (e.message === 'No JWT set' && process.env.NODE_ENV === 'test') {
        return;
      } else {
        // console.error('Error in thunk items/removeItem:', e);
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

          Object.values(item.modifiers).forEach((modifier) => {
            modifier.ids.forEach((modifierId: string) => {
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
    } catch (e: any) {
      if (e.message === 'No JWT set' && process.env.NODE_ENV === 'test') {
        return;
      } else {
        // console.error('Error in thunk items/removeItemWithoutHistory:', e);
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
    } catch (e: any) {
      if (
        e.message === 'No JWT set' &&
        (process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'production')
      ) {
        return;
      } else {
        // console.error('Error in thunk items/removeItems:', e);
      }
    }
  }
);

export const undoItemAction = createAsyncThunk(
  'items/undoItems',
  async (_, { dispatch, getState }) => {
    dispatch(ActionCreators.undo());
  }
);

export const redoItemAction = createAsyncThunk(
  'items/redoItems',
  async (_, { dispatch, getState }) => {
    dispatch(ActionCreators.redo());
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
    const itemState = itemsSelectors.selectById(
      getState() as RootState,
      itemId
    );
    if (!itemState) throw new Error('Item not found');

    const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;
    item.rotate();
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }
);

export const rotateCcw = createAsyncThunk(
  'items/rotate',
  async (itemId: string, { dispatch, getState }) => {
    const itemState = itemsSelectors.selectById(
      getState() as RootState,
      itemId
    );
    if (!itemState) throw new Error('Item not found');

    const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;
    item.rotateCcw();
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }
);

export const copyItem = createAsyncThunk(
  'items/copy',
  async (itemId: string, { dispatch, getState }) => {
    const itemState = itemsSelectors.selectById(
      getState() as RootState,
      itemId
    );
    if (!itemState) throw new Error('Item not found');

    const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;
    const copiedItem = item.copyWithModifiers();

    dispatch(addItem(ItemReduxAdapter.itemToState(copiedItem)));
  }
);

export const incrementModifier = createAsyncThunk(
  'items/incrementModifier',
  async (
    { itemId, modifier }: { itemId: string; modifier: Modifier },
    { dispatch, getState }
  ) => {
    try {
      const itemState = itemsSelectors.selectById(
        getState() as RootState,
        itemId
      );
      if (!itemState) throw new Error('Item not found');
      const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;

      const newModifier = new ModifierItem({
        name: modifier.name,
        recordId: modifier.recordId,
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });
      dispatch(addItem(ItemReduxAdapter.itemToState(newModifier)));

      item.addModifier(newModifier);

      dispatch(
        updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
      );
    } catch (e) {
      // console.error('Error in thunk items/addModifer:', e);
    }
  }
);

export const decrementModifier = createAsyncThunk(
  'items/decrementModifier',
  async (
    { itemId, modifier }: { itemId: string; modifier: Modifier },
    { dispatch, getState }
  ) => {
    const itemState = itemsSelectors.selectById(
      getState() as RootState,
      itemId
    );
    if (!itemState) throw new Error('Item not found');
    const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;

    const idOfModifierToRemove = item.modifiers[modifier.name].ids[0];

    const modifierToRemove = itemsSelectors.selectById(
      getState() as RootState,
      idOfModifierToRemove
    );

    if (!modifierToRemove)
      throw new Error('Attempted to remove modifier, no modifier found');

    dispatch(removeOne(idOfModifierToRemove));
    item.removeModifier(
      ItemReduxAdapter.stateToItem(modifierToRemove) as ModifierItem
    );

    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }
);

export default itemsSlice.reducer;
