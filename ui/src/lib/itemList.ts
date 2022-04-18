import { LayerState } from '../features/interactions/interactionsState';
import { IItem } from './item';
import { IPlaceableItem, isPlaceableItem } from './item/placeableItem';
import { Layer } from './layer';

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

export const sortCeilingItemsToLast = (items: (IItem | IPlaceableItem)[]) => {
  const itemsCopy = [...items];
  const sortedItems = itemsCopy.sort((a, b) => {
    if (isPlaceableItem(a) && !isPlaceableItem(b)) {
      return 1;
    } else if (isPlaceableItem(b) && !isPlaceableItem(a)) {
      return -1;
    } else if (!isPlaceableItem(a) && !isPlaceableItem(b)) {
      return 0;
    } else if (isPlaceableItem(a) && isPlaceableItem(b)) {
      if (a.layer === Layer.FLOOR && b.layer !== Layer.FLOOR) {
        return -1;
      }

      if (a.layer !== Layer.FLOOR && b.layer === Layer.FLOOR) {
        return 1;
      }
    }

    return 0;
  });

  const itemList: IItem[] = [];
  sortedItems.forEach((item) => itemList.push(item));
  return itemList;
};

export const sortItems = (
  items: IItem[],
  selectedItemIds: string[],
  showLayer: LayerState
): IItem[] => {
  // ceiling items should display on top, so sort to end of array
  let sortedItems = sortCeilingItemsToLast(items);

  // ... unless the ceiling layer is disabled
  if (showLayer[Layer.FLOOR] === true && showLayer[Layer.CEILING] === false) {
    sortedItems.reverse();
  }

  // lastly, selected items go on top
  return sortSelectedToLast(sortedItems, selectedItemIds);
};
