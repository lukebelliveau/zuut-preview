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
    amazonProducts,
    selectedAmazonASIN,
    linkedASINs,
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
      linkedASINs,
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
      selectedAmazonASIN,
    });
  }

  get image() {
    return OscillatingFanImage;
  }

  copy(): OscillatingFanItem {
    return new OscillatingFanItem(this.copyArgs());
  }

  copyWithModifiers(): OscillatingFanItem {
    return new OscillatingFanItem(this.copyArgsWithModifiers());
  }
}
