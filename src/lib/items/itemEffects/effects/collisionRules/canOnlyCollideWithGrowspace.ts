import { Dictionary } from '@reduxjs/toolkit';
import {
  CollisionError,
  ItemState,
  PlaceableItemState,
} from '../../../../../features/items/itemState';
import { CollisionRule } from '../useComputeCollisionState';

export const canOnlyCollideWithGrowspace: CollisionRule = (
  item: PlaceableItemState,
  itemEntities: Dictionary<ItemState>
): CollisionError[] => {
  const collisionIds = item.placement.collisionIds;
  const errors: CollisionError[] = [];

  collisionIds.forEach((collision) => {
    const collidingItem = itemEntities[collision];

    if (collidingItem) {
      if (collidingItem.type !== 'Growspace') {
        errors.push({
          id: collidingItem.id,
          message: `Cannot be placed on top of item type ${collidingItem.type}`,
        });
      }
    }
  });

  return errors;
};
