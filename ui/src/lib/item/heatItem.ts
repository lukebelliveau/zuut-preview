import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import HeatImage from '../../images/items/heat.png';
import GrowspaceItem from './growspaceItem';

export const HEAT_ITEM_TYPE = 'HeatItemType';

export function isHeatItem(item: Item): item is HeatItem {
  return (item as HeatItem).type === HEAT_ITEM_TYPE;
}

export default class HeatItem extends GrowspaceItem implements IPlaceableItem {
  type = HEAT_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    ASIN = undefined,
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
    super({ name, id, ASIN });
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
    return new HeatItem({
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
