import { v4 } from 'uuid';
import { Item } from '../item';
import {
  CollisionState,
  IPlaceableItem,
  Layer,
  PlacementShadow,
} from './placeableItem';
import DuctImage from '../../images/items/duct.png';
import { isWindowItem } from './windowitem';
import CeilingPlaceableItem from './ceilingPlaceableItem';
import { isCeilingGrowspaceItem } from './ceilingGrowspaceItem';

export const DUCT_ITEM_TYPE = 'DuctItem';

export function isDuctItem(item: Item): item is DuctItem {
  return item instanceof DuctItem;
}

export default class DuctItem extends CeilingPlaceableItem {
  type = DUCT_ITEM_TYPE;
  image = DuctImage;
  layer = Layer.CEILING;

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

  collisionStateBetween(
    item: PlacementShadow | IPlaceableItem,
    otherItem: IPlaceableItem
  ): CollisionState {
    if (isCeilingGrowspaceItem(otherItem)) {
      return CollisionState.CONFLICTED;
    } else if (isWindowItem(otherItem)) {
      return CollisionState.CONNECTED;
    }

    return super.collisionStateBetween(this, otherItem);
  }
}
