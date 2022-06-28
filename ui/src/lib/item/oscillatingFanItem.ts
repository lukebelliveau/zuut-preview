import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlacementShadow,
} from './placeableItem';
import OscillatingFanImage from '../../images/items/oscillating_fan.png';
import { v4 } from 'uuid';
import { Item } from '../item';

export const OSCILLATING_FAN_ITEM_TYPE = 'OscillatingFanItemType';

export function isOscillatingFanItem(item: Item): item is OscillatingFanItem {
  return (item as OscillatingFanItem).type === OSCILLATING_FAN_ITEM_TYPE;
}

const defaultFanModifiers = { 'Rope Ratchets': [] };

export default class OscillatingFanItem
  extends CeilingGrowspaceItem
  implements IPlaceableItem
{
  type = OSCILLATING_FAN_ITEM_TYPE;
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
    return OscillatingFanImage;
  }

  copy(): OscillatingFanItem {
    return new OscillatingFanItem(
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
