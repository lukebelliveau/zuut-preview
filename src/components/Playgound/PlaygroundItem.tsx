import { Rect, Image } from 'react-konva';
import useImage from 'use-image';
import { KonvaEventObject } from 'konva/lib/Node';
import { useItemsAdapter } from '../../lib/items/itemsAdapter';
import { PlaceableItemState } from '../../features/items/itemState';

type PlaygroundItemProps = {
  item: PlaceableItemState;
};

export function PlaygroundItem({ item }: PlaygroundItemProps) {
  const { updateLocation } = useItemsAdapter();
  const [image] = useImage(item.image ? item.image : '');

  function updatePlacement(
    item: PlaceableItemState,
    e: KonvaEventObject<DragEvent>
  ) {
    const { x, y } = { x: e.target.x(), y: e.target.y() };

    updateLocation(item, x, y);
  }

  if (image) {
    return (
      <Image
        image={image}
        x={item.placement.x}
        y={item.placement.y}
        height={item.length}
        width={item.width}
        onDragEnd={(e) => updatePlacement(item, e)}
        // onMouseDown={(e) => onDragMove(e, item)}
        // onMouseUp={endDrag}
        // onDragMove={(e) => onDragMove(e, item)}
        // onDragEnd={endDrag}
        // strokeWidth={isDragging ? 20 : 0}
        // stroke={item.collisionState.status === 'GOOD' ? 'green' : 'red'}
        draggable
        itemType={item.type}
      />
    );
  }

  return (
    <Rect
      x={item.placement.x}
      y={item.placement.y}
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
