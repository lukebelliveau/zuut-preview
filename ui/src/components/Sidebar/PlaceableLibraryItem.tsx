import { useDrag } from 'react-dnd';
import PlaceableItem from '../../lib/item/placeableItem';

import ItemIcon from './ItemIcon';
import { DRAGGABLE_SIDEBAR_ITEM } from './SidebarTabs';

type PlaceableLibraryItemProps = {
  item: PlaceableItem;
  placeItem: (item: PlaceableItem) => void;
};

export default function PlaceableLibraryItem({
  item,
  placeItem,
}: PlaceableLibraryItemProps) {
  const [_, drag] = useDrag(() => ({
    type: DRAGGABLE_SIDEBAR_ITEM,
    item,
  }));

  return (
    <ItemIcon
      item={item}
      dragRef={drag}
      onClick={() => placeItem(item)}
      onKeyboard={() => placeItem(item)}
    />
  );
}
