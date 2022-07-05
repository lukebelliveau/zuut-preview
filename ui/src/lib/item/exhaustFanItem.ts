import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import ExhaustFanImage from '../../images/items/exhaust_fan.png';
import { v4 } from 'uuid';
import { Item } from '../item';

export const EXHAUST_FAN_ITEM_TYPE = 'ExhaustFanItemType';

export function isExhaustFanItem(item: Item): item is ExhaustFanItem {
  return (item as ExhaustFanItem).type === EXHAUST_FAN_ITEM_TYPE;
}

const defaultFanModifiers = { 'Rope Ratchets': [] };

export default class ExhaustFanItem
  extends CeilingGrowspaceItem
  implements IPlaceableItem
{
  type = EXHAUST_FAN_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    ASIN = undefined,
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
      name: name,
      id: id,
      ASIN: ASIN,
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
    });
  }

  get image() {
    return ExhaustFanImage;
  }

  copy(): ExhaustFanItem {
    return new ExhaustFanItem({
      name: this.name,
      id: v4(),
      ASIN: this.ASIN,
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
    });
  }
}
