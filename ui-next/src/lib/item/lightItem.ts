import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import { CollisionState, IPlaceableItem, PlaceableItemArgs } from './placeableItem';
import LightImage from '../../assets/items/led_light.png';
import { v4 } from 'uuid';
import { Item } from '../item';
import { initRopeRatchets } from './initModifiers';

export const LIGHT_ITEM_TYPE = 'LightItem';

export function isLightItem(item: Item): item is LightItem {
  return (item as LightItem).type === LIGHT_ITEM_TYPE;
}

const defaultLightModifiers = { 'Rope Ratchets': initRopeRatchets() };

export default class LightItem extends CeilingGrowspaceItem implements IPlaceableItem {
  type = LIGHT_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    recordId,
    amazonProducts,
    selectedAmazonASIN,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    linkedASINs,
    modifiers = defaultLightModifiers,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({
      name,
      id,
      amazonProducts,
      width,
      length,
      height,
      recordId,
      selectedAmazonASIN,
      linkedASINs,
    });
    this.x = x;
    this.y = y;
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
    return new LightItem(this.copyArgs());
  }

  copyWithModifiers(): LightItem {
    return new LightItem(this.copyArgsWithModifiers());
  }
}
