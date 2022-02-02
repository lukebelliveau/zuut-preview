import { Dictionary } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectAllItemEntities } from '../../../../features/items/itemsSelectors';
import { updateOne } from '../../../../features/items/itemsSlice';
import {
  CollisionError,
  CollisionState,
  CollisionStatus,
  ItemState,
  PlaceableItemState,
} from '../../../../features/items/itemState';

const collisionStatesIdentical = (a: CollisionState, b: CollisionState) => {
  // this is sloppy, should probably deep compare the errors if that ends up mattering
  if (a.status !== b.status) return false;
  if (a.errors.length !== b.errors.length) return false;

  return true;
};

export type CollisionRule = (
  item: PlaceableItemState,
  itemEntities: Dictionary<ItemState>
) => CollisionError[];

const useComputeCollisionState = (
  item: PlaceableItemState,
  collisionRules: CollisionRule[]
) => {
  const dispatch = useDispatch();
  const itemEntities = useSelectAllItemEntities();

  useEffect(() => {
    let status: CollisionStatus = 'GOOD';
    let errors: CollisionError[] = [];

    collisionRules.forEach((rule) => {
      errors = errors.concat(rule(item, itemEntities));
    });

    if (errors.length > 0) {
      status = 'BAD';
    }

    const collisionState = { status, errors };

    if (
      !collisionStatesIdentical(item.placement.collisionState, collisionState)
    )
      dispatch(
        updateOne({
          id: item.id,
          changes: {
            placement: {
              ...item.placement,
              collisionState,
            },
          },
        })
      );
  }, [collisionRules, dispatch, item, itemEntities]);
};

export default useComputeCollisionState;
