import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import { CollisionState, IPlaceableItem, PlaceableItemArgs } from './placeableItem';
import OscillatingFanImage from '../../assets/items/oscillating_fan.png';
import { v4 } from 'uuid';
import { Item } from '../item';
import { initRopeRatchets } from './initModifiers';

export const OSCILLATING_FAN_ITEM_TYPE = 'OscillatingFanItem';

export function isOscillatingFanItem(item: Item): item is OscillatingFanItem {
  return (item as OscillatingFanItem).type === OSCILLATING_FAN_ITEM_TYPE;
}

const defaultFanModifiers = { 'Rope Ratchets': initRopeRatchets() };

export default class OscillatingFanItem extends CeilingGrowspaceItem implements IPlaceableItem {
  type = OSCILLATING_FAN_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    amazonProducts = undefined,
    recordId,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    modifiers = defaultFanModifiers,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({
      name,
      id,
      amazonProducts,
      recordId,
      x,
      y,
      width,
      length,
      height,
      description,
      rotation,
      modifiers,
      collisionState,
      placementShadow,
    });
  }

  get image() {
    return OscillatingFanImage;
  }

  copy(): OscillatingFanItem {
    return new OscillatingFanItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
      recordId: this.recordId,
    });
  }

  copyWithModifiers(): OscillatingFanItem {
    return new OscillatingFanItem({
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
    });
  }
}
