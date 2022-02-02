import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { addOne, updateOne } from '../../features/items/itemsSlice';
import {
  PlaceableItemState,
  PlacementState,
} from '../../features/items/itemState';
import { BaseItem } from './itemTypes';

export const defaultPlacementState: PlacementState = {
  x: 0,
  y: 0,
  collisionIds: [],
  collisionState: {
    status: 'GOOD',
    errors: [],
  },
};

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
      ...defaultPlacementState,
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

  const updatePlacementLocation = (
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
            ...item.placement,
            x,
            y,
          },
        },
      })
    );
  };

  return {
    addItem,
    addItemWithPosition,
    updatePlacement: updatePlacementLocation,
  };
};

export default useItemsAdapter;
