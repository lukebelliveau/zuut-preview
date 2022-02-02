import { Rect } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useItemsAdapter } from '../../lib/items/itemReduxAdapter';
import { PlaceableItemState } from '../../features/items/itemState';

type PlaygroundItemProps = {
  item: PlaceableItemState;
};

export function PlaygroundItem({ item }: PlaygroundItemProps) {
  const { updateLocation } = useItemsAdapter();

  function updatePlacement(
    item: PlaceableItemState,
    e: KonvaEventObject<DragEvent>
  ) {
    const { x, y } = { x: e.target.x(), y: e.target.y() };

    updateLocation(item, x, y);
  }

  return (
    <Rect
      x={item.placeable.x}
      y={item.placeable.y}
      width={item.width}
      height={item.length}
      stroke="black"
      strokeWidth={1}
      strokeScaleEnabled={false}
      onDragEnd={(e) => updatePlacement(item, e)}
      draggable
    />
  );
}
