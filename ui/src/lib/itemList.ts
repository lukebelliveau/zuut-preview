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
  selectedItemIds: string[]
): ItemList => {
  const itemsCopy = [...items];
  const sortedItems = itemsCopy.sort((a, b) => {
    if (selectedItemIds.includes(a.id) && !selectedItemIds.includes(b.id)) {
      return 1;
    }

    if (!selectedItemIds.includes(a.id) && selectedItemIds.includes(b.id)) {
      return -1;
    }

    return 0;
  });

  const itemList = new ItemList();
  sortedItems.forEach((item) => itemList.push(item));
  return itemList;
};
