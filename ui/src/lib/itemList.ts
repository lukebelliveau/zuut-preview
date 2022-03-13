import { IItem } from './item';
import { IPlaceableItem, isPlaceableItem } from './item/placeableItem';

export default class ItemList extends Array<IItem> {
  placeable(): IPlaceableItem[] {
    return this.filter((item) => isPlaceableItem(item)) as IPlaceableItem[];
  }
}

/**
 * If an item is selected, place it at the end of the array so Konva renders it on top.
 */
export const sortSelectedToLast = (
  items: ItemList,
  idOfSelectedItem: string | undefined
): ItemList => {
  if (!idOfSelectedItem || items.length === 0) {
    return items;
  }

  const itemsCopy = [...items];

  const indexOfSelected = itemsCopy.findIndex(
    (item) => item.id === idOfSelectedItem
  );
  const [selectedItem] = itemsCopy.splice(indexOfSelected, 1);

  const sortedItems = new ItemList();

  itemsCopy.forEach((item) => sortedItems.push(item));
  sortedItems.push(selectedItem);

  return sortedItems;
};
