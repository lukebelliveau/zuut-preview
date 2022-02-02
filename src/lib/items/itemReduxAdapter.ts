import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { addOne, updateOne } from '../../features/items/itemsSlice';
import {
  PlaceableItemState,
  PlaceableState,
} from '../../features/items/itemState';
import { BaseItem } from './itemTypes';

export const useItemsAdapter = () => {
  const dispatch = useDispatch();

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

  return { addItem, addItemWithPosition, updateLocation };
};

export default useItemsAdapter;
