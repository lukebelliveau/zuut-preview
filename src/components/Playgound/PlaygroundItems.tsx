import { Layer, Rect } from 'react-konva';
import { useDispatch } from 'react-redux';

import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { updateOne } from '../../features/items/itemsSlice';
import PlaceableItem from '../../lib/item/placeableItem';
import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';
import { Fragment } from 'react';

export default function PlaygroundItems() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const items = useBuildItemList();

  function updatePlacement(item: PlaceableItem, x: number, y: number) {
    item.setPosition({ x, y }, items, playground);
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }

  function drop(item: PlaceableItem, x: number, y: number) {
    item.drop({ x, y }, items, playground);
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }

  function updateFinalPlacement(item: PlaceableItem, x: number, y: number) {
    drop(item, x, y);
    items.placeable().forEach((item) => updatePlacement(item, item.x, item.y));
  }

  return (
    <Layer>
      {items.placeable().map((item) => {
        const { placementShadow } = item;

        return (
          <Fragment key={item.id}>
            <Rect
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.length}
              stroke={item.isColliding ? 'red' : 'black'}
              strokeWidth={1}
              strokeScaleEnabled={false}
              onDragMove={(e) =>
                updatePlacement(item, e.target.x(), e.target.y())
              }
              onDragEnd={(e) =>
                updateFinalPlacement(item, e.target.x(), e.target.y())
              }
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
