import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import { Item } from '../item';
import WallItem from './wallItem';
import DoorImage from '../../assets/items/door.png';
import { Layer } from '../layer';

export const DOOR_ITEM_TYPE = 'DoorItem';

export function isDoorItem(item: Item): item is DoorItem {
  return item instanceof DoorItem;
}
export default class DoorItem extends WallItem {
  type: string = DOOR_ITEM_TYPE;
  layer = Layer.BOTH;

  get image() {
    return DoorImage;
  }

  copy(): DoorItem {
    return new DoorItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: feetToMm(0.5),
      length: feetToMm(2),
      height: this.height,
      description: this.description,
    });
  }

  copyWithModifiers(): DoorItem {
    return new DoorItem({
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
}
