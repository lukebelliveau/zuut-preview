import { useSelector } from 'react-redux';

import MiscItem from '../../lib/items/miscItem';
import PlaygroundRepository from '../../lib/playground/playgroundRepository';
import ShoppingListRepository from '../../lib/shoppingList/shoppingListRepository';
import ItemIcon from './ItemIcon';

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

    const shoppingRepo = ShoppingListRepository.forRedux();
    shoppingRepo.create(item);
  }

  return <ItemIcon item={item} onClick={placeItem} onKeyboard={placeItem} />;
}