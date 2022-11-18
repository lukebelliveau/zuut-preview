import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import HumidifierImage from '../../assets/items/humidifier.png';
import GrowspaceItem from './growspaceItem';

export const HUMIDIFIER_ITEM_TYPE = 'HumidifierItem';

export function isHumidifierItem(item: Item): item is HumidifierItem {
  return (item as HumidifierItem).type === HUMIDIFIER_ITEM_TYPE;
}

export default class HumidifierItem extends GrowspaceItem implements IPlaceableItem {
  type = HUMIDIFIER_ITEM_TYPE;
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
    return HumidifierImage;
  }
  copy(): HumidifierItem {
    return new HumidifierItem(this.copyArgs());
  }

  copyWithModifiers(): HumidifierItem {
    return new HumidifierItem(this.copyArgsWithModifiers());
  }
}