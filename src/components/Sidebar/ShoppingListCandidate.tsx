import { useDrag } from 'react-dnd';

import { useItemsAdapter } from '../../lib/items/itemsAdapter';
import { BaseItem } from '../../lib/items/itemTypes';
import { MISC_ITEM_TYPE } from '../../lib/items/miscItem';
import ItemIcon from './ItemIcon';

type ShoppingListCandidateProps = {
  item: BaseItem;
};

export default function ShoppingListCandidate({
  item,
}: ShoppingListCandidateProps) {
  const { addItem } = useItemsAdapter();

  const [_, drag] = useDrag(() => {
    return {
      type: MISC_ITEM_TYPE,
      item,
    };
  });

  function sendToShoppingList() {
    addItem(item);
  }

  return (
    <ItemIcon dragRef={drag} item={item} onKeyboard={sendToShoppingList} />
  );
}
