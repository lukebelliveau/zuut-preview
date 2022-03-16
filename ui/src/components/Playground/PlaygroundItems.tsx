import { Layer, Rect, Image } from 'react-konva';
import { useDispatch } from 'react-redux';

import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import {
  removeItem,
  updateOne,
  updateOneWithoutHistory,
} from '../../features/items/itemsSlice';
import {
  CollisionState,
  IPlaceableItem,
  PlacementShadow,
} from '../../lib/item/placeableItem';
import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';
import { Fragment, MutableRefObject, useEffect, useRef } from 'react';
import { Point } from '../../lib/point';

import { selectSelectedItemId } from '../../features/interactions/interactionsSelectors';
import { useAppSelector } from '../../app/hooks';
import {
  select,
  toggleSelect,
} from '../../features/interactions/interactionsSlice';
import { sortSelectedToLast } from '../../lib/itemList';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDispatchDropItem } from '../../features/items/itemsHooks';

const useTrackCollisions = () => {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const items = useBuildItemList();

  useEffect(() => {
    items.placeable().forEach((item) => {
      const oldCollisionState = item.collisionState;
      item.updateCollisions(items, playground);
      if (oldCollisionState !== item.collisionState) {
        dispatch(
          updateOne({
            id: item.id,
            changes: ItemReduxAdapter.itemToState(item),
          })
        );
      }
    });
  }, [items, playground, dispatch]);
};

export default function PlaygroundItems() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const items = useBuildItemList();
  const selectedItemIds = useAppSelector(selectSelectedItemId);
  const dispatchDropItem = useDispatchDropItem();

  function updatePlacement(item: IPlaceableItem, newPosition: Point) {
    dispatch(select(item.id));
    item.drag(newPosition, items, playground);
    dispatch(
      updateOneWithoutHistory({
        id: item.id,
        changes: ItemReduxAdapter.itemToState(item),
      })
    );
  }

  function dropAndUpdateItemCollisions(item: IPlaceableItem): void {
    const itemDroppedOnPlayground = item.drop(items, playground);
    if (itemDroppedOnPlayground) {
      dispatchDropItem(item);
    } else {
      dispatch(removeItem(item.id));
    }
  }

  useTrackCollisions();

  return (
    <Layer>
      {sortSelectedToLast(items, selectedItemIds)
        .placeable()
        .map((item) => {
          return (
            <Fragment key={item.id}>
              <Item
                item={item}
                updatePlacement={updatePlacement}
                dropAndUpdateItemCollisions={dropAndUpdateItemCollisions}
              />
              <Shadow shadow={item.placementShadow} />
            </Fragment>
          );
        })}
    </Layer>
  );
}

/**
 * This 'hack' with refs & effects seems to be the best way
 * to detect keyboard events along with a click.
 */
const useHandleItemClicks = (
  item: IPlaceableItem,
  itemRef: MutableRefObject<any>
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickKeyboardEvents = (e: any) => {
      if (e.metaKey) {
        dispatch(toggleSelect(item.id));
      } else {
        dispatch(select(item.id));
      }
    };

    if (itemRef && itemRef.current) {
      const currentItemRef = itemRef.current;
      currentItemRef.addEventListener('click', handleClickKeyboardEvents);

      return () => {
        currentItemRef.removeEventListener('click', handleClickKeyboardEvents);
      };
    }
  }, [dispatch, item.id, itemRef]);
};

const Item = ({
  item,
  updatePlacement,
  dropAndUpdateItemCollisions,
}: {
  item: IPlaceableItem;
  updatePlacement: (item: IPlaceableItem, newPosition: Point) => void;
  dropAndUpdateItemCollisions: (item: IPlaceableItem) => void;
}) => {
  if (!item.image) throw new Error('Image not found in ImageItem component');

  // create manually instead of using Konva's `use-image` package.
  // useImage() asynchronously loads the image every time the component mounts, causing flickering on zoom (because children of the Stage re-mount).
  const imageObj = new window.Image();
  imageObj.src = item.image;

  const selectedItemIds = useAppSelector(selectSelectedItemId);

  const setContainerCursor = (
    cursor: string,
    e: KonvaEventObject<MouseEvent>
  ) => {
    if (e.target.getStage()?.container()) {
      const container = e.target?.getStage()?.container();
      if (container) {
        container.style.cursor = cursor;
      }
    }
  };

  const handleDragMove = (e: KonvaEventObject<MouseEvent>) => {
    updatePlacement(item, { x: e.target.x(), y: e.target.y() });

    setContainerCursor('grabbing', e);
  };

  const handleDragEnd = (e: KonvaEventObject<MouseEvent>) => {
    dropAndUpdateItemCollisions(item);

    setContainerCursor('grab', e);
  };

  const itemRef = useRef<any>(null);

  useHandleItemClicks(item, itemRef);

  return (
    <Image
      key={item.id}
      x={item.x}
      y={item.y}
      ref={itemRef}
      width={item.width}
      height={item.length}
      stroke={getCollisionColor(item.collisionState)}
      strokeWidth={selectedItemIds?.includes(item.id) ? 2 : 1}
      strokeScaleEnabled={false}
      rotation={item.rotation}
      offset={item.offset}
      draggable
      opacity={item.placementShadow ? 0.2 : 1}
      /**
       * don't use imageObj in tests, because there is no window.Image() in tests
       */
      image={process.env.NODE_ENV === 'test' ? undefined : imageObj}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onMouseEnter={(e) => setContainerCursor('grab', e)}
      onMouseLeave={(e) => setContainerCursor('auto', e)}
    />
  );
};

const getCollisionColor = (collisionState: CollisionState) => {
  switch (collisionState) {
    case CollisionState.CONFLICTED:
      return 'red';
    case CollisionState.NEUTRAL:
      return 'black';
    case CollisionState.CONNECTED:
      return 'green';
  }
};

const Shadow = ({ shadow }: { shadow?: PlacementShadow }) => {
  if (!shadow) return null;

  return (
    <Rect
      x={shadow.x}
      y={shadow.y}
      width={shadow.width}
      height={shadow.length}
      stroke={getCollisionColor(shadow.collisionState)}
      strokeWidth={1}
      strokeScaleEnabled={false}
      offset={shadow.offset}
      draggable
    />
  );
};
