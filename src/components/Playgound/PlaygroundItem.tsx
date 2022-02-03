import { Rect } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDispatch } from 'react-redux';

import PlaceableItem from '../../lib/item/placeableItem';
import { updateOne } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';

type PlaygroundItemProps = {
  item: PlaceableItem;
}

export function PlaygroundItem({ item }: PlaygroundItemProps) {
  const dispatch = useDispatch();

  function updatePlacement(item: PlaceableItem, e: KonvaEventObject<DragEvent>) {
    item.setPosition({
      x: e.target.x(),
      y: e.target.y()
    });
    dispatch(updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) }));
  }

  return <Rect
    x={item.x}
    y={item.y}
    width={item.width}
    height={item.length}
    stroke="black"
    strokeWidth={1}
    strokeScaleEnabled={false}
    onDragEnd={e => updatePlacement(item, e)}
    draggable
  />;
}
// convertDistance(distance: number) {
//   return distance * this.playground.scale;
// }