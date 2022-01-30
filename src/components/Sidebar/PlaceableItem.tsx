import { useSelector } from 'react-redux';

import MiscItem from '../../lib/items/miscItem';
import PlaygroundRepository from '../../lib/playground/playgroundRepository';

type PlaceableItemProps = {
  item: MiscItem;
}

export default function PlaceableItem({ item }: PlaceableItemProps) {
  const playgroundRepo = PlaygroundRepository.forReduxSelector(useSelector);
  const playground = playgroundRepo.select();
  
  function placeItem() {
    const repo = PlaygroundRepository.forRedux();
    item.setStartingXPosition((playground.plan?.room?.width || 0)/2);
    item.setStartingYPosition((playground.plan?.room?.length || 0)/2);
    playground.items = playground.items.concat(item);
    repo.addItem(playground);
  }

  function onKeyboard(e: any): void {
    if (e.key === 'Return') placeItem();
  }

  return <div role="button" tabIndex={0} onClick={placeItem} onKeyDown={onKeyboard}>
    {item.name}
  </div>;
}