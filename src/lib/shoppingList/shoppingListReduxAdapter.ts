import { store } from '../../app/store';
import { shoppingListSelectors } from '../../features/shoppingListItems/shoppingListSelectors';
import { create } from '../../features/shoppingListItems/shoppingListSlice';
import { ShoppingListState } from '../../features/shoppingListItems/shoppingListState';
import MiscItem from '../items/miscItem';
import { ShoppingListAdapter } from './shoppingListAdapter';

export default class ShoppingListReduxAdapter implements ShoppingListAdapter {
  all(): MiscItem[] {
    const shoppingListItems = shoppingListSelectors.selectAll(store.getState());

    return ShoppingListReduxAdapter.allFromState(shoppingListItems);
  }

  create(item: MiscItem) {
    store.dispatch(create(ShoppingListReduxAdapter.shoppingListItemToState(item)));
  }

  public static allFromState(items: ShoppingListState[]) {
    return items.map(item => ShoppingListReduxAdapter.shoppingListItemFromState(item));
  }

  public static shoppingListItemToState(item: MiscItem): ShoppingListState {
    return {
      id: item.id,
      name: item.name
    };
  }

  public static shoppingListItemFromState(shopingListState: ShoppingListState): MiscItem {
    return new MiscItem(
      shopingListState.name,
      shopingListState.id,
    );
  }
}