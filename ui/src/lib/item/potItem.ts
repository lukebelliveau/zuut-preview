import { v4 } from 'uuid';

import { IPlaceableItem } from './placeableItem';
import PotImage from '../../images/items/pot.svg';
import GrowspaceItem from './growspaceItem';
import { Item } from '../item';

export const POT_ITEM_TYPE = 'PotItem';

export function isPotItem(item: Item): item is PotItem {
  return (item as PotItem).type === POT_ITEM_TYPE;
}

export default class PotItem extends GrowspaceItem implements IPlaceableItem {
  type: string = POT_ITEM_TYPE;
  image: string = PotImage;

  copy(): PotItem {
    return new PotItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height,
    );
  }
}
