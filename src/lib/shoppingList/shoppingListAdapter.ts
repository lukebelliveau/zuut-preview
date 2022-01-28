import MiscItem from '../items/miscItem';

export interface ShoppingListAdapter {
  all(): MiscItem[];
  create(item: MiscItem): void;
}