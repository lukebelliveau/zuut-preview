import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import HeatImage from '../../assets/items/heat.png';
import GrowspaceItem from './growspaceItem';

export const HEAT_ITEM_TYPE = 'HeatItem';

export function isHeatItem(item: Item): item is HeatItem {
  return (item as HeatItem).type === HEAT_ITEM_TYPE;
}

export default class HeatItem extends GrowspaceItem implements IPlaceableItem {
  type = HEAT_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    amazonProducts,
    selectedAmazonASIN,
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
    return HeatImage;
  }

  copy(): HeatItem {
    return new HeatItem(this.copyArgs());
  }

  copyWithModifiers(): HeatItem {
    return new HeatItem(this.copyArgsWithModifiers());
  }
}
