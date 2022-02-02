import { useSelectPlanById } from '../../features/plans/planSelectors';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import { useItemsAdapter } from '../../lib/items/itemsAdapter';
import { BaseItem } from '../../lib/items/itemTypes';
import usePlanAdapter from '../../lib/plan/planAdapter';

import ItemIcon from './ItemIcon';

type PlaceableLibraryItemProps = {
  item: BaseItem;
};

export default function PlaceableLibraryItem({
  item,
}: PlaceableLibraryItemProps) {
  const playgroundState = useSelectPlayground();
  if (!playgroundState.planId) throw new Error('No planId!');
  const { getRoomCenter } = usePlanAdapter();
  const { addItemWithPosition } = useItemsAdapter();
  const plan = useSelectPlanById(playgroundState.planId);

  function placeItem() {
    if (!plan) throw new Error('No plan found');

    const { x, y } = getRoomCenter(plan);
    addItemWithPosition(item, x, y);
  }

  return <ItemIcon item={item} onClick={placeItem} onKeyboard={placeItem} />;
}
