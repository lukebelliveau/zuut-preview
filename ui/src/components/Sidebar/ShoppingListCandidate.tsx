import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addOne } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import MiscItem from '../../lib/item/miscItem';
import ItemIcon from './ItemIcon';
import { DRAGGABLE_SIDEBAR_ITEM } from './SidebarTabs';

type ShoppingListCandidateProps = {
  item: MiscItem;
};

export default function ShoppingListCandidate({
  item,
}: ShoppingListCandidateProps) {
  const dispatch = useDispatch();

  const [_, drag] = useDrag(() => ({
    type: DRAGGABLE_SIDEBAR_ITEM,
    item,
  }));

  function sendToShoppingList() {
    dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
  }

  return (
    <ItemIcon
      dragRef={drag}
      item={item}
      onClick={sendToShoppingList}
      onKeyboard={sendToShoppingList}
    />
  );
}
