import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { addOne, updateOne } from '../../features/items/itemsSlice';
import {
  PlaceableItemState,
  PlacementState,
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
    const placement: PlacementState = {
      x,
      y,
    };

    dispatch(
      addOne({
        id: v4(),
        ...item,
        placement,
      })
    );
  };

  const updatePlacement = (
    item: PlaceableItemState | undefined,
    x: number,
    y: number
  ) => {
    if (!item) throw new Error('Called updateLocation without an item!');

    dispatch(
      updateOne({
        id: item.id,
        changes: {
          placement: {
            x,
            y,
          },
        },
      })
    );
  };

  return { addItem, addItemWithPosition, updatePlacement };
};

export default useItemsAdapter;
