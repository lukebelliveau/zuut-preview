import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import PurifierImage from '../../assets/items/purifier.png';
import GrowspaceItem from './growspaceItem';

export const PURIFIER_ITEM_TYPE = 'PurifierItem';

export function isPurifierItem(item: Item): item is PurifierItem {
  return (item as PurifierItem).type === PURIFIER_ITEM_TYPE;
}

export default class PurifierItem extends GrowspaceItem implements IPlaceableItem {
  type = PURIFIER_ITEM_TYPE;

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
    modifiers = {},
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
    recordId,
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
    return PurifierImage;
  }

  copy(): PurifierItem {
    return new PurifierItem(this.copyArgs());
  }

  copyWithModifiers(): PurifierItem {
    return new PurifierItem(this.copyArgsWithModifiers());
  }
}
