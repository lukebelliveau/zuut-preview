import { shoppingListSelectors } from '../../features/shoppingListItems/shoppingListSelectors';
import MiscItem from '../items/miscItem';
import { ShoppingListAdapter } from './shoppingListAdapter';
import ShoppingListReduxAdapter from './shoppingListReduxAdapter';

export default class ShoppingListReduxSelectorAdapter implements ShoppingListAdapter {
  selector: any;

  constructor(selector: any) {
    this.selector = selector;
  }

  all(): MiscItem[] {
    const shoppingListItems: MiscItem[] = this.selector(shoppingListSelectors.selectAll);

    return ShoppingListReduxAdapter.allFromState(shoppingListItems);
  }

  create() {
    throw new Error('#create not implemented');
  }
}