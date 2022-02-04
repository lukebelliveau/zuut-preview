import { Layer, Rect } from 'react-konva';
import { useDispatch } from 'react-redux';

import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { updateOne } from '../../features/items/itemsSlice';
import PlaceableItem from '../../lib/item/placeableItem';
import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';

export default function PlaygroundItems() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const items = useBuildItemList();

  function updatePlacement(item: PlaceableItem, x: number, y: number) {
    item.setPosition({ x, y }, items);
    dispatch(
      updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) })
    );
  }

  function updateFinalPlacement(item: PlaceableItem, x: number, y: number) {
    updatePlacement(item, x, y);
    items.placeable().forEach((item) => updatePlacement(item, item.x, item.y));
  }

  return (
    <Layer>
      {items.placeable().map((item) => (
        <Rect
          key={item.id}
          x={item.x}
          y={item.y}
          width={item.width}
          height={item.length}
          stroke={item.isColliding ? 'red' : 'black'}
          strokeWidth={1}
          strokeScaleEnabled={false}
          onDragMove={(e) => updatePlacement(item, e.target.x(), e.target.y())}
          onDragEnd={(e) =>
            updateFinalPlacement(item, e.target.x(), e.target.y())
          }
          draggable
        />
      ))}
    </Layer>
  );
}
