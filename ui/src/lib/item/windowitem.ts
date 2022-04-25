import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import { Item } from '../item';
import { isDuctItem } from './ductItem';
import {
  CollisionState,
  IPlaceableItem,
  PlacementShadow,
} from './placeableItem';
import WallItem from './wallItem';

export const WINDOW_ITEM_TYPE = 'WindowItem';

export function isWindowItem(item: Item): item is WindowItem {
  return item instanceof WindowItem;
}
export default class WindowItem extends WallItem {
  type: string = WINDOW_ITEM_TYPE;

  copy(): WindowItem {
    return new WindowItem(
      this.name,
      v4(),
      this.x,
      this.y,
      feetToMm(0.2),
      feetToMm(2),
      this.height,
      this.description
    );
  }

  collisionStateBetween(
    item: PlacementShadow | IPlaceableItem,
    otherItem: IPlaceableItem
  ): CollisionState {
    if (isDuctItem(otherItem)) {
      return CollisionState.CONNECTED;
    }

    return super.collisionStateBetween(this, otherItem);
  }
}
