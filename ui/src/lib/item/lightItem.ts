import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import { IPlaceableItem } from './placeableItem';
import LightImage from '../../images/items/light.png';
import { v4 } from 'uuid';
import { Item } from '../item';

export const LIGHT_ITEM_TYPE = 'LightItem';

export function isLightItem(item: Item): item is LightItem {
  return (item as LightItem).type === LIGHT_ITEM_TYPE;
}

export default class LightItem
  extends CeilingGrowspaceItem
  implements IPlaceableItem
{
  type = LIGHT_ITEM_TYPE;

  get image() {
    return LightImage;
  }

  copy(): LightItem {
    return new LightItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height,
      this.description
    );
  }
}
