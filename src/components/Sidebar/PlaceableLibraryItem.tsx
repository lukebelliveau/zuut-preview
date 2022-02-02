import { useDispatch, useSelector } from 'react-redux';

import { addOne } from '../../features/items/itemsSlice';
import { useSelectPlanById } from '../../features/plans/planSelectors';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import ItemReduxAdapter from '../../lib/items/itemReduxAdapter';
import PlaceableItem from '../../lib/items/placeableItem';
import usePlanAdapter from '../../lib/plan/planAdapter';

import ItemIcon from './ItemIcon';

type PlaceableLibraryItemProps = {
  item: PlaceableItem;
};

export default function PlaceableLibraryItem({
  item,
}: PlaceableLibraryItemProps) {
  const dispatch = useDispatch();
  const playgroundState = useSelectPlayground();
  if (!playgroundState.planId) throw new Error('No planId!');
  const { getRoomCenter } = usePlanAdapter();
  const plan = useSelectPlanById(playgroundState.planId);

  function placeItem() {
    if (!plan) throw new Error('No plan found');

    item.setPosition(getRoomCenter(plan));

    dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
  }

  return <ItemIcon item={item} onClick={placeItem} onKeyboard={placeItem} />;
}
