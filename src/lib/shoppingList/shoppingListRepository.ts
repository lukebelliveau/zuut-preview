import MiscItem from '../objects/miscItem';
import { ShoppingListAdapter } from './shoppingListAdapter';
import ShoppingListReduxAdapter from './shoppingListReduxAdapter';
import ShoppingListReduxSelectorAdapter from './shoppingListReduxSelectorAdapter';

export default class ShoppingListRepository {
  adapter: ShoppingListAdapter;

  public static forRedux() {
    const adapter = new ShoppingListReduxAdapter();
    return new ShoppingListRepository(adapter);
  }

  public static forReduxSelector(selector: any) {
    const adapter = new ShoppingListReduxSelectorAdapter(selector);
    return new ShoppingListRepository(adapter);
  }

  constructor(adapter: ShoppingListAdapter) {
    this.adapter = adapter;
  }

  all(): MiscItem[] {
    return this.adapter.all();
  }

  create(item: MiscItem) {
    this.adapter.create(item);
  }
}