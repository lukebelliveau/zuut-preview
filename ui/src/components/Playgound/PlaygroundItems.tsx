import { Layer, Rect, Image } from 'react-konva';
import { useDispatch } from 'react-redux';

import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { removeOne, updateOne } from '../../features/items/itemsSlice';
import { CollisionState, IPlaceableItem } from '../../lib/item/placeableItem';
import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';
import { Fragment } from 'react';
import { Point } from '../../lib/point';

import { selectSelectedItemId } from '../../features/interactions/interactionsSelectors';
import { useAppSelector } from '../../app/hooks';
import {
  select,
  toggleSelect,
} from '../../features/interactions/interactionsSlice';
import { sortSelectedToLast } from '../../lib/itemList';

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

    items.placeable().forEach((item) => {
      item.updateCollisions(items, playground);
      dispatch(
        updateOne({
          id: item.id,
          changes: ItemReduxAdapter.itemToState(item),
        })
      );
    });
  }

  return (
    <Layer>
      {sortSelectedToLast(items, selectedItemId)
        .placeable()
        .map((item) => {
          const { placementShadow, image } = item;

          const itemElement = image ? (
            <ImageItem
              item={item}
              updatePlacement={updatePlacement}
              dropAndUpdateItemCollisions={dropAndUpdateItemCollisions}
            />
          ) : (
            <Rect
              key={item.id}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.length}
              stroke={
                item.collisionState === CollisionState.BAD ? 'red' : 'black'
              }
              strokeWidth={item.id === selectedItemId ? 2 : 1}
              strokeScaleEnabled={false}
              onDragMove={(e) => {
                updatePlacement(item, { x: e.target.x(), y: e.target.y() });
              }}
              onDragEnd={() => dropAndUpdateItemCollisions(item)}
              draggable
              opacity={placementShadow ? 0.2 : 1}
              onClick={() => dispatch(toggleSelect(item.id))}
            />
          );

          return (
            <Fragment key={item.id}>
              {itemElement}
              {placementShadow ? (
                <Rect
                  x={placementShadow.x}
                  y={placementShadow.y}
                  width={placementShadow.width}
                  height={placementShadow.length}
                  stroke={
                    placementShadow.collisionState === CollisionState.BAD
                      ? 'red'
                      : 'black'
                  }
                  strokeWidth={1}
                  strokeScaleEnabled={false}
                  draggable
                />
              ) : null}
            </Fragment>
          );
        })}
    </Layer>
  );
}

const ImageItem = ({
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
      onDragMove={(e) => {
        updatePlacement(item, { x: e.target.x(), y: e.target.y() });
      }}
      onDragEnd={() => dropAndUpdateItemCollisions(item)}
      draggable
      opacity={item.placementShadow ? 0.2 : 1}
      image={imageObj}
      onClick={() => dispatch(toggleSelect(item.id))}
    />
  );
};
