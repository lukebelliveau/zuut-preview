import { Layer } from 'react-konva';
import { useSelectAllItems } from '../../features/items/itemsSelectors';
import { PlaceableItemState } from '../../features/items/itemState';
import { PlaygroundItem } from './PlaygroundItem';

export default function PlaygroundItems() {
  const items = useSelectAllItems();

  const placeableItems: PlaceableItemState[] = items.filter(
    (item): item is PlaceableItemState => item.placeable !== undefined
  );

  return (
    <Layer>
      {placeableItems.map((item) => (
        <PlaygroundItem key={item.id} item={item} />
      ))}
    </Layer>
  );
}
