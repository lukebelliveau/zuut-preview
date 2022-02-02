import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { useSelectAllItems } from '../../features/items/itemsSelectors';
import { addOne, updateOne } from '../../features/items/itemsSlice';
import {
  PlaceableItemState,
  PlaceableState,
} from '../../features/items/itemState';
import { BaseItem } from './itemTypes';

export const useItemsAdapter = () => {
  const dispatch = useDispatch();
  const items = useSelectAllItems();

  const addItem = (item: BaseItem) => {
    dispatch(
      addOne({
        id: v4(),
        ...item,
      })
    );
  };

  const addItemWithPosition = (item: BaseItem, x: number, y: number) => {
    const placeable: PlaceableState = {
      x,
      y,
    };

    dispatch(
      addOne({
        id: v4(),
        ...item,
        placeable,
      })
    );
  };

  const selectPlaceableItems = (): PlaceableItemState[] => {
    return items.filter(
      (item) => item.placeable !== undefined
    ) as PlaceableItemState[];
  };

  const updateLocation = (
    item: PlaceableItemState | undefined,
    x: number,
    y: number
  ) => {
    if (!item) throw new Error('Called updateLocation without an item!');

    dispatch(
      updateOne({
        id: item.id,
        changes: {
          placeable: {
            x,
            y,
          },
        },
      })
    );
  };

  return { addItem, addItemWithPosition, selectPlaceableItems, updateLocation };
};

export default useItemsAdapter;
