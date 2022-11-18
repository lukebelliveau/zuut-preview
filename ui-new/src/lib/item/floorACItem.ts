import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import FloorACImage from '../../assets/items/floor_ac.png';
import GrowspaceItem from './growspaceItem';

export const FLOOR_AC_ITEM_TYPE = 'FloorACItem';

export function isFloorACItem(item: Item): item is FloorACItem {
  return (item as FloorACItem).type === FLOOR_AC_ITEM_TYPE;
}

export default class FloorACItem extends GrowspaceItem implements IPlaceableItem {
  type = FLOOR_AC_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    amazonProducts,
    selectedAmazonASIN,
    recordId,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    modifiers = {},
    linkedASINs,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({ name, id, amazonProducts, recordId, selectedAmazonASIN, linkedASINs });
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
    return new FloorACItem(this.copyArgs());
  }

  copyWithModifiers(): FloorACItem {
    return new FloorACItem(this.copyArgsWithModifiers());
  }
}
