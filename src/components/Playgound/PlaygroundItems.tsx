import { Layer } from 'react-konva';

import { useSelectAllItems } from '../../features/items/itemsSelectors';
import ItemReduxAdapter from '../../lib/items/itemReduxAdapter';
import { PlaygroundItem } from './PlaygroundItem';

export default function PlaygroundItems() {
  const itemStates = useSelectAllItems();

  const items = ItemReduxAdapter.itemStatesToItemList(itemStates);

  return <Layer>
    {items.placeable().map(item => <PlaygroundItem key={item.id} item={item} />)}
  </Layer>;
}