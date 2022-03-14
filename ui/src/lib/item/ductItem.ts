import { v4 } from 'uuid';
import { Item } from '../item';
import ItemList from '../itemList';
import Playground from '../playground';
import PlaceableItem from './placeableItem';
import DuctImage from '../../images/items/duct.png';

export const DUCT_ITEM_TYPE = 'DuctItem';

export function isDuctItem(item: Item): item is DuctItem {
  return item instanceof DuctItem;
}

export default class DuctItem extends PlaceableItem {
  type = DUCT_ITEM_TYPE;
  image = DuctImage;

  copy(): DuctItem {
    return new DuctItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height
    );
  }

  updateCollisions(items: ItemList, playground: Playground) {
    super.updateCollisions(items, playground);
  }
}
