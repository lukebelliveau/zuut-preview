import { useDrag } from 'react-dnd';

import MiscItem from '../../lib/items/miscItem';
import ShoppingListRepository from '../../lib/shoppingList/shoppingListRepository';
import ItemIcon from './ItemIcon';

type ShoppingListCandidateProps = {
  item: MiscItem;
}

export default function ShoppingListCandidate({ item }: ShoppingListCandidateProps) {
  const [_, drag] = useDrag(() => ({
    type: 'Misc',
    item
  }));

  function sendToShoppingList() {
    const repo = ShoppingListRepository.forRedux();
    repo.create(item);
  }

  return <ItemIcon dragRef={drag} item={item} onKeyboard={sendToShoppingList} />;
}