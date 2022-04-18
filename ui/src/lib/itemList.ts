import { IItem } from './item';
import { IPlaceableItem, isPlaceableItem } from './item/placeableItem';

/**
 * If an item is selected, place it at the end of the array so Konva renders it on top.
 */
export const sortSelectedToLast = (
  items: IItem[],
  selectedItemIds: string[]
): IItem[] => {
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

  const itemList: IItem[] = [];
  sortedItems.forEach((item) => itemList.push(item));
  return itemList;
};
