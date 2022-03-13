import RectangleImage from '../../images/items/rectangle.svg';

import { Item } from '../../lib/item';
import { isPlaceableItem } from '../../lib/item/placeableItem';

export function ItemImage({ item }: { item: Item }) {
  if (isPlaceableItem(item)) {
    return <img src={item.image} alt={item.name} />;
  } else {
    return <img src={RectangleImage} alt={item.name} />;
  }
};