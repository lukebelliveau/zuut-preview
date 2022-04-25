import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlacementShadow,
} from './placeableItem';
import LightImage from '../../images/items/light.png';
import { v4 } from 'uuid';
import { Item } from '../item';

export const LIGHT_ITEM_TYPE = 'LightItem';

export function isLightItem(item: Item): item is LightItem {
  return (item as LightItem).type === LIGHT_ITEM_TYPE;
}

const defaultLightModifiers = { ratchets: [] };

export default class LightItem
  extends CeilingGrowspaceItem
  implements IPlaceableItem
{
  type = LIGHT_ITEM_TYPE;
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
    modifiers: Modifiers = defaultLightModifiers,
    collisionState: CollisionState = CollisionState.NEUTRAL,
    placementShadow: PlacementShadow | undefined = undefined
  ) {
    super(name, id);
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
    this.description = description;
    this.collisionState = collisionState;
    this.placementShadow = placementShadow;
    this.rotation = rotation;
    this.modifiers = modifiers;
  }

  get image() {
    return LightImage;
  }

  copy(): LightItem {
    return new LightItem(
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
