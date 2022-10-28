import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import DehumidifierImage from '../../assets/items/dehumidifier.png';
import GrowspaceItem from './growspaceItem';

export const DEHUMIDIFIER_ITEM_TYPE = 'DehumidifierItem';

export function isDehumidifierItem(item: Item): item is DehumidifierItem {
  return (item as DehumidifierItem).type === DEHUMIDIFIER_ITEM_TYPE;
}

export default class DehumidifierItem extends GrowspaceItem implements IPlaceableItem {
  type = DEHUMIDIFIER_ITEM_TYPE;
  constructor({
    name,
    id = v4(),
    amazonProducts = undefined,
    recordId,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    modifiers = {},
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({ name, id, amazonProducts, recordId });
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
    return new DehumidifierItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      recordId: this.recordId,
    });
  }

  copyWithModifiers(): DehumidifierItem {
    return new DehumidifierItem({
      name: this.name,
      id: v4(),
      x: this.xPlus50(),
      y: this.yPlus50(),
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
      modifiers: this.modifiers,
      recordId: this.recordId,
    });
  }
}
