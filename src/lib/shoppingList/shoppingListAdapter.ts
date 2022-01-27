import MiscItem from '../objects/miscItem';

export interface ShoppingListAdapter {
  all(): MiscItem[];
  create(item: MiscItem): void;
}