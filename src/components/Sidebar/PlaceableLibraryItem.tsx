import { useDispatch, useSelector } from 'react-redux';

import { addOne } from '../../features/items/itemsSlice';
import { useSelectPlanById } from '../../features/plans/planSelectors';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import PlaceableItem from '../../lib/item/placeableItem';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';

import ItemIcon from './ItemIcon';

type PlaceableLibraryItemProps = {
  item: PlaceableItem;
}

export default function PlaceableLibraryItem({ item }: PlaceableLibraryItemProps) {
  const dispatch = useDispatch();
  const playgroundState = useSelectPlayground();
  const planState = useSelectPlanById(playgroundState.planId);
  
  function placeItem() {
    if (!planState) throw new Error('No plan found');

    const playground = PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);
    item.setPosition(playground.place());
    
    dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
  }

  return <ItemIcon item={item} onClick={placeItem} onKeyboard={placeItem} />;
}