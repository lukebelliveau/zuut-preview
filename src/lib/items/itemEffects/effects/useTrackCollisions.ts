import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectAllPlaceableItems } from '../../../../features/items/itemsSelectors';
import { updateOne } from '../../../../features/items/itemsSlice';
import { PlaceableItemState } from '../../../../features/items/itemState';

const arraysMatch = (a: string[], b: string[]) => {
  return (
    a.every((item) => b.includes(item)) && b.every((item) => a.includes(item))
  );
};

const haveIntersection = (r1: PlaceableItemState, r2: PlaceableItemState) => {
  return !(
    r2.placement.x > r1.placement.x + r1.width ||
    r2.placement.x + r2.width < r1.placement.x ||
    r2.placement.y > r1.placement.y + r1.height ||
    r2.placement.y + r2.height < r1.placement.y
  );
};

const useTrackCollisions = (item: PlaceableItemState) => {
  const dispatch = useDispatch();
  const items = useSelectAllPlaceableItems();

  useEffect(() => {
    let collisions: string[] = [];
    items.forEach((currentItem) => {
      if (item.id === currentItem.id) {
        return;
      }

      if (haveIntersection(currentItem, item)) {
        collisions.push(currentItem.id);
      }
    });

    if (!arraysMatch(item.placement?.collisionIds, collisions)) {
      dispatch(
        updateOne({
          id: item.id,
          changes: {
            placement: {
              ...item.placement,
              collisionIds: collisions,
            },
          },
        })
      );
    }
  }, [item, items, dispatch]);
};

export default useTrackCollisions;
