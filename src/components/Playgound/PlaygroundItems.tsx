import { Layer, Rect } from 'react-konva';
import { useDispatch } from 'react-redux';

import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { updateOne } from '../../features/items/itemsSlice';
import PlaceableItem from '../../lib/item/placeableItem';
import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';
import { Fragment } from 'react';
import { Point } from '../../lib/point';

export default function PlaygroundItems() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const items = useBuildItemList();

  function updatePlacement(item: PlaceableItem, newPosition: Point) {
    item.drag(newPosition, items, playground);
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }

  function dropAndUpdateItemCollisions(item: PlaceableItem): void {
    item.drop(items, playground);
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
    items.placeable().forEach((item) => {
      item.detectCollisions(items, playground);
      dispatch(
        updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
      );
    });
  }

  return (
    <Layer>
      {items.placeable().map((item) => {
        const { placementShadow } = item;

        return (
          <Fragment key={item.id}>
            <Rect
              key={item.id}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.length}
              stroke={item.isColliding ? 'red' : 'black'}
              strokeWidth={1}
              strokeScaleEnabled={false}
              onDragMove={(e) => {
                updatePlacement(item, { x: e.target.x(), y: e.target.y() });
              }}
              onDragEnd={() => dropAndUpdateItemCollisions(item)}
              draggable
              opacity={placementShadow ? 0.2 : 1}
            />
            {placementShadow ? (
              <Rect
                x={placementShadow.x}
                y={placementShadow.y}
                width={placementShadow.width}
                height={placementShadow.length}
                stroke={placementShadow.isColliding ? 'red' : 'black'}
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
