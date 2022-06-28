import { v4 } from 'uuid';
import { CollisionState, Modifiers, PlacementShadow } from './placeableItem';
import CurvedDuctImage from '../../images/items/curved_duct.png';
import DuctItem from './ductItem';

export const CURVED_DUCT_ITEM_TYPE = 'CurvedDuctItem';

const defaultDuctModifiers = { 'Rope Ratchets': [] };

export default class CurvedDuctItem extends DuctItem {
  type = CURVED_DUCT_ITEM_TYPE;

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
    modifiers: Modifiers = defaultDuctModifiers,
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
    return CurvedDuctImage;
  }

  copy(): CurvedDuctItem {
    return new CurvedDuctItem(
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
