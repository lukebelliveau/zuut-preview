import { v4 } from 'uuid';
import { CollisionState, PlaceableItemArgs } from './placeableItem';
import CurvedDuctImage from '../../assets/items/curved_duct.png';
import DuctItem from './ductItem';
import { initRopeRatchets } from './initModifiers';

export const CURVED_DUCT_ITEM_TYPE = 'CurvedDuctItem';

const defaultDuctModifiers = { 'Rope Ratchets': initRopeRatchets() };

export default class CurvedDuctItem extends DuctItem {
  type = CURVED_DUCT_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    amazonProducts,
    selectedAmazonASIN,
    linkedASINs,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    modifiers = defaultDuctModifiers,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({
      name,
      id,
      amazonProducts,
      selectedAmazonASIN,
      linkedASINs,
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
    return CurvedDuctImage;
  }

  copy(): CurvedDuctItem {
    return new CurvedDuctItem(this.copyArgs());
  }

  copyWithModifiers(): CurvedDuctItem {
    return new CurvedDuctItem(this.copyArgsWithModifiers());
  }
}
