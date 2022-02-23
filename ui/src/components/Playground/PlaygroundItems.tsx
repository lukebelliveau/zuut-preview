import { Layer, Rect, Image } from 'react-konva';
import { useDispatch } from 'react-redux';

import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { removeOne, updateOne } from '../../features/items/itemsSlice';
import {
  CollisionState,
  IPlaceableItem,
  PlacementShadow,
} from '../../lib/item/placeableItem';
import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';
import { Fragment, useEffect } from 'react';
import { Point } from '../../lib/point';

import { selectSelectedItemId } from '../../features/interactions/interactionsSelectors';
import { useAppSelector } from '../../app/hooks';
import {
  select,
  toggleSelect,
} from '../../features/interactions/interactionsSlice';
import { sortSelectedToLast } from '../../lib/itemList';
import { KonvaEventObject } from 'konva/lib/Node';

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
  const selectedItemId = useAppSelector(selectSelectedItemId);

  function updatePlacement(item: IPlaceableItem, newPosition: Point) {
    dispatch(select(item.id));
    item.drag(newPosition, items, playground);
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }

  function dropAndUpdateItemCollisions(item: IPlaceableItem): void {
    const itemDroppedOnPlayground = item.drop(items, playground);
    if (itemDroppedOnPlayground) {
      dispatch(
        updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
      );
    } else {
      dispatch(removeOne(item.id));
    }
  }

  useTrackCollisions();

  return (
    <Layer>
      {sortSelectedToLast(items, selectedItemId)
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

const Item = ({
  item,
  updatePlacement,
  dropAndUpdateItemCollisions,
}: {
  item: IPlaceableItem;
  updatePlacement: (item: IPlaceableItem, newPosition: Point) => void;
  dropAndUpdateItemCollisions: (item: IPlaceableItem) => void;
}) => {
  const dispatch = useDispatch();
  if (!item.image) throw new Error('Image not found in ImageItem component');

  // create manually instead of using Konva's `use-image` package.
  // useImage() asynchronously loads the image every time the component mounts, causing flickering on zoom (because children of the Stage re-mount).
  const imageObj = new window.Image();
  imageObj.src = item.image;

  const selectedItemId = useAppSelector(selectSelectedItemId);

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

  return (
    <Image
      key={item.id}
      x={item.x}
      y={item.y}
      width={item.width}
      height={item.length}
      stroke={item.collisionState === CollisionState.BAD ? 'red' : 'black'}
      strokeWidth={item.id === selectedItemId ? 2 : 1}
      strokeScaleEnabled={false}
      draggable
      opacity={item.placementShadow ? 0.2 : 1}
      image={imageObj}
      onClick={() => dispatch(toggleSelect(item.id))}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onMouseEnter={(e) => setContainerCursor('grab', e)}
      onMouseLeave={(e) => setContainerCursor('auto', e)}
    />
  );
};

const Shadow = ({ shadow }: { shadow?: PlacementShadow }) => {
  if (!shadow) return null;

  return (
    <Rect
      x={shadow.x}
      y={shadow.y}
      width={shadow.width}
      height={shadow.length}
      stroke={shadow.collisionState === CollisionState.BAD ? 'red' : 'black'}
      strokeWidth={1}
      strokeScaleEnabled={false}
      draggable
    />
  );
};
