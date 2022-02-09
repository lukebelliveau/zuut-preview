import PlaceableItem from '../../lib/item/placeableItem';

import ItemIcon from './ItemIcon';

type PlaceableLibraryItemProps = {
  item: PlaceableItem;
  placeItem: (item: PlaceableItem) => void;
}

export default function PlaceableLibraryItem({ item, placeItem }: PlaceableLibraryItemProps) {
  return <ItemIcon item={item} onClick={() => placeItem(item)} onKeyboard={() => placeItem(item)} />;
}