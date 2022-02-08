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
  const plan = playground.plan;
  if (!plan) throw new Error('No plan found');
  const grid = plan.grid;

  function drag(item: PlaceableItem, newPosition: Point) {
    updatePlacement(item, newPosition);
  }
 
  function updatePlacement(item: PlaceableItem, newPosition: Point) {
    item.setPosition(newPosition, items, playground);
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }

  function drop(item: PlaceableItem, position: Point): Point {
    const snappedPosition = grid.snapPostition(position);
    item.drop(snappedPosition, items, playground);
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
    items.placeable().forEach((item) => updatePlacement(item, item));
    return snappedPosition;
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
              onDragMove={(e) =>
                drag(item, { x: e.target.x(), y: e.target.y() })
              }
              onDragEnd={(e) => {
                const newPosition = drop(item, { x: e.target.x(), y: e.target.y() });
                e.target.to({
                  ...newPosition,
                  duration: 0.001,
                });
              }}
              draggable
              opacity={0.5}
            />
            {placementShadow ? (
              <Rect
                x={placementShadow.x}
                y={placementShadow.y}
                width={placementShadow.width}
                height={placementShadow.length}
                stroke={'black'}
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
