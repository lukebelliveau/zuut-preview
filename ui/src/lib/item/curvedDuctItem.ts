import { v4 } from 'uuid';
import {
  CollisionState,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import CurvedDuctImage from '../../images/items/curved_duct.png';
import DuctItem from './ductItem';

export const CURVED_DUCT_ITEM_TYPE = 'CurvedDuctItem';

const defaultDuctModifiers = { 'Rope Ratchets': [] };

export default class CurvedDuctItem extends DuctItem {
  type = CURVED_DUCT_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    amazonProducts = undefined,
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
    return new CurvedDuctItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
    });
  }
}
