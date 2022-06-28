import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import FloorACImage from '../../images/items/floor_ac.png';

export const FLOOR_AC_ITEM_TYPE = 'FloorACItemType';

export function isFloorACItem(item: Item): item is FloorACItem {
  return (item as FloorACItem).type === FLOOR_AC_ITEM_TYPE;
}

export default class FloorACItem
  extends PlaceableItem
  implements IPlaceableItem
{
  type = FLOOR_AC_ITEM_TYPE;
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
    modifiers: Modifiers = {},
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
    return FloorACImage;
  }

  copy(): FloorACItem {
    return new FloorACItem(
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
