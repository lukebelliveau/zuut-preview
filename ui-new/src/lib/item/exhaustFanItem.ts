import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import { CollisionState, IPlaceableItem, PlaceableItemArgs } from './placeableItem';
import ExhaustFanImage from '../../assets/items/exhaust_fan.png';
import { v4 } from 'uuid';
import { Item } from '../item';
import { initRopeRatchets } from './initModifiers';

export const EXHAUST_FAN_ITEM_TYPE = 'ExhaustFanItem';

export function isExhaustFanItem(item: Item): item is ExhaustFanItem {
  return (item as ExhaustFanItem).type === EXHAUST_FAN_ITEM_TYPE;
}

const defaultFanModifiers = { 'Rope Ratchets': initRopeRatchets() };

export default class ExhaustFanItem extends CeilingGrowspaceItem implements IPlaceableItem {
  type = EXHAUST_FAN_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    amazonProducts,
    selectedAmazonASIN,
    recordId,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    linkedASINs,
    modifiers = defaultFanModifiers,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({
      name: name,
      id: id,
      amazonProducts,
      selectedAmazonASIN,
      x: x,
      y: y,
      width: width,
      length: length,
      height: height,
      description: description,
      rotation: rotation,
      modifiers: modifiers,
      collisionState: collisionState,
      placementShadow: placementShadow,
      recordId,
      linkedASINs,
    });
  }

  get image() {
    return ExhaustFanImage;
  }

  copy(): ExhaustFanItem {
    return new ExhaustFanItem(this.copyArgs());
  }

  copyWithModifiers(): ExhaustFanItem {
    return new ExhaustFanItem(this.copyArgsWithModifiers());
  }
}
