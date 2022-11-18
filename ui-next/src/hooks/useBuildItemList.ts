import { IItem } from 'src/lib/item';
import ItemReduxAdapter from 'src/lib/item/itemReduxAdapter';
import { useSelectAllItems } from 'src/redux/features/items/itemsSelectors';

function useBuildItemList(): IItem[] {
  const itemsState = useSelectAllItems();
  return ItemReduxAdapter.itemStatesToItemList(itemsState);
}

export default useBuildItemList;
