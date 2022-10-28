import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import { Item } from '../item';
import { Layer } from '../layer';
import { isDuctItem } from './ductItem';
import { CollisionState, IPlaceableItem, PlacementShadow } from './placeableItem';
import WallItem from './wallItem';
import WindowImage from '../../assets/items/window.png';

export const WINDOW_ITEM_TYPE = 'WindowItem';

export function isWindowItem(item: Item): item is WindowItem {
  return item instanceof WindowItem;
}
export default class WindowItem extends WallItem {
  type: string = WINDOW_ITEM_TYPE;
  layer = Layer.CEILING;

  get image() {
    return WindowImage;
  }

  copy(): WindowItem {
    return new WindowItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: feetToMm(0.2),
      length: feetToMm(2),
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
    });
  }

  copyWithModifiers(): WindowItem {
    return new WindowItem({
      name: this.name,
      id: v4(),
      x: this.xPlus50(),
      y: this.yPlus50(),
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
      modifiers: this.modifiers,
      recordId: this.recordId,
    });
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
