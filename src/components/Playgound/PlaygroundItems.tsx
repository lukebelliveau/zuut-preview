import { Layer } from 'react-konva';
import { useSelectAllItems } from '../../features/items/itemsSelectors';
import { PlaceableItemState } from '../../features/items/itemState';

import { useItemsAdapter } from '../../lib/items/itemReduxAdapter';
import { PlaygroundItem } from './PlaygroundItem';

export default function PlaygroundItems() {
  const items = useSelectAllItems();

  const placeableItems = items.filter((item) => item.placeable !== undefined);

  return (
    <Layer>
      {placeableItems.map((item) => (
        <PlaygroundItem key={item.id} item={item as PlaceableItemState} />
      ))}
    </Layer>
  );
}
