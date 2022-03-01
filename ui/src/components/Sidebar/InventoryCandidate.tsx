import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addItem } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import MiscItem from '../../lib/item/miscItem';
import ItemIcon from './ItemIcon';
import { DRAGGABLE_SIDEBAR_ITEM } from './SidebarTabs';

type InventoryCandidateProps = {
  item: MiscItem;
};

export default function InventoryCandidate({ item }: InventoryCandidateProps) {
  const dispatch = useDispatch();

  const [_, drag] = useDrag(() => ({
    type: DRAGGABLE_SIDEBAR_ITEM,
    item,
  }));

  function sendToInventory() {
    dispatch(addItem(ItemReduxAdapter.itemToState(item.copy())));
  }

  return (
    <ItemIcon
      dragRef={drag}
      item={item}
      onClick={sendToInventory}
      onKeyboard={sendToInventory}
    />
  );
}
