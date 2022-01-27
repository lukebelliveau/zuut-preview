import { RootState } from '../../app/rootState';
import shoppinglistEntityAdapter from './shoppingListEntityAdapter';

export const shoppingListSelectors = shoppinglistEntityAdapter.getSelectors<RootState>(
  state => state.shoppingListItems
);