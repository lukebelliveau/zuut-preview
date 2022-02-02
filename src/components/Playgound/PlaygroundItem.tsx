import { Rect, Image } from 'react-konva';
import useImage from 'use-image';
import { KonvaEventObject } from 'konva/lib/Node';
import { useItemsAdapter } from '../../lib/items/itemsAdapter';
import { PlaceableItemState } from '../../features/items/itemState';
import useInteractionsAdapter from '../../lib/interactions/interactionsAdapter';
import { getEffectFor } from '../../lib/items/itemEffects/itemEffects';
import { useSelectDragState } from '../../features/interactions/interactionsSelectors';

type PlaygroundItemProps = {
  item: PlaceableItemState;
};

const useIsDragging = (item: PlaceableItemState) => {
  const dragState = useSelectDragState();
  return dragState?.id === item.id;
};

export function PlaygroundItem({ item }: PlaygroundItemProps) {
  const { updatePlacement: updateLocation } = useItemsAdapter();
  const [image] = useImage(item.image ? item.image : '');
  const { updateMoveDrag, endDrag } = useInteractionsAdapter();

  function dragItem(item: PlaceableItemState, e: KonvaEventObject<MouseEvent>) {
    const { x, y } = { x: e.target.x(), y: e.target.y() };

    updateLocation(item, x, y);
    updateMoveDrag(item, e);
  }

  const useItemEffect = getEffectFor(item);
  useItemEffect(item);

  const isDragging = useIsDragging(item);

  if (image) {
    return (
      <Image
        image={image}
        x={item.placement.x}
        y={item.placement.y}
        height={item.length}
        width={item.width}
        onMouseDown={(e) => dragItem(item, e)}
        onMouseUp={endDrag}
        onDragMove={(e) => dragItem(item, e)}
        onDragEnd={endDrag}
        strokeWidth={isDragging ? 20 : 0}
        stroke={
          item.placement.collisionState.status === 'GOOD' ? 'green' : 'red'
        }
        draggable
        itemType={item.type}
      />
    );
  }

  return (
    <Rect
      image={image}
      x={item.placement.x}
      y={item.placement.y}
      height={item.length}
      width={item.width}
      onMouseDown={(e) => dragItem(item, e)}
      onMouseUp={endDrag}
      onDragMove={(e) => dragItem(item, e)}
      onDragEnd={endDrag}
      strokeWidth={isDragging ? 20 : 0}
      stroke={item.placement.collisionState.status === 'GOOD' ? 'green' : 'red'}
      draggable
      itemType={item.type}
    />
  );
}
