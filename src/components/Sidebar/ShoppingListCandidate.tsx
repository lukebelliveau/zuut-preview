import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addOne } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/items/itemReduxAdapter';
import MiscItem, { MISC_ITEM_TYPE } from '../../lib/items/miscItem';
import ItemIcon from './ItemIcon';

type ShoppingListCandidateProps = {
  item: MiscItem;
}

export default function ShoppingListCandidate({ item }: ShoppingListCandidateProps) {
  const dispatch = useDispatch();

  const [_, drag] = useDrag(() => ({
    type: MISC_ITEM_TYPE,
    item
  }));

  function sendToShoppingList() {
    dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
  }

  return <ItemIcon dragRef={drag} item={item} onKeyboard={sendToShoppingList} />;
}