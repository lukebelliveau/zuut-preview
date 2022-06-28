import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
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
  constructor(
    name: string,
    id: string = v4(),
    x: number = 0,
    y: number = 0,
    width: number = 610,
    length: number = 610,
    height: number = 915,
    description: string = '',
    rotation: number = 0,
    modifiers: Modifiers = defaultFanModifiers,
    collisionState: CollisionState = CollisionState.NEUTRAL,
    placementShadow: PlacementShadow | undefined = undefined
  ) {
    super(
      name,
      id,
      x,
      y,
      width,
      length,
      height,
      description,
      rotation,
      modifiers,
      collisionState,
      placementShadow
    );
  }

  get image() {
    return ExhaustFanImage;
  }

  copy(): ExhaustFanItem {
    return new ExhaustFanItem(
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
