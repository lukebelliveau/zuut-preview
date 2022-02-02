import { Layer } from 'react-konva';

import { useItemsAdapter } from '../../lib/items/itemReduxAdapter';
import { PlaygroundItem } from './PlaygroundItem';

export default function PlaygroundItems() {
  const { selectPlaceableItems } = useItemsAdapter();

  const items = selectPlaceableItems();

  return (
    <Layer>
      {items.map((item) => (
        <PlaygroundItem key={item.id} item={item} />
      ))}
    </Layer>
  );
}
