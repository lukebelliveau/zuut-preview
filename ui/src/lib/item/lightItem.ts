import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import { IPlaceableItem } from './placeableItem';
import LightImage from '../../images/items/light.png';
import { v4 } from 'uuid';

export const LIGHT_ITEM_TYPE = 'LightItem';

export default class LightItem
  extends CeilingGrowspaceItem
  implements IPlaceableItem
{
  type = LIGHT_ITEM_TYPE;
  image = LightImage;

  copy(): LightItem {
    return new LightItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height
    );
  }
}
