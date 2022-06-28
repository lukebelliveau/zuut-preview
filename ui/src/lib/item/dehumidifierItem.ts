import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import DehumidifierImage from '../../images/items/dehumidifier.png';

export const DEHUMIDIFIER_ITEM_TYPE = 'DehumidifierItemType';

export function isDehumidifierItem(item: Item): item is DehumidifierItem {
  return (item as DehumidifierItem).type === DEHUMIDIFIER_ITEM_TYPE;
}

export default class DehumidifierItem
  extends PlaceableItem
  implements IPlaceableItem
{
  type = DEHUMIDIFIER_ITEM_TYPE;
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
    return DehumidifierImage;
  }

  copy(): DehumidifierItem {
    return new DehumidifierItem(
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
