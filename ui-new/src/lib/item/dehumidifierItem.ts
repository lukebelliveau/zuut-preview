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
    amazonProducts,
    selectedAmazonASIN,
    linkedASINs,
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
    return DehumidifierImage;
  }

  copy(): DehumidifierItem {
    return new DehumidifierItem(this.copyArgs());
  }

  copyWithModifiers(): DehumidifierItem {
    return new DehumidifierItem(this.copyArgsWithModifiers());
  }
}
