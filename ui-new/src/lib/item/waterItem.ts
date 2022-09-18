import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import WaterContainerImage from '../../assets/items/water_container.png';

export const WATER_ITEM_TYPE = 'WaterItem';

export function isWaterItem(item: Item): item is WaterItem {
  return (item as WaterItem).type === WATER_ITEM_TYPE;
}

const defaultWaterModifiers = {
  'Water Pump': [],
  Hose: [],
  'Spray Handle': [],
  'Air pump': [],
  'Air stone': [],
};

export default class WaterItem extends PlaceableItem implements IPlaceableItem {
  type = WATER_ITEM_TYPE;
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
    modifiers = defaultWaterModifiers,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({ name, id, amazonProducts });
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
    this.recordId = recordId;
  }

  get image() {
    return WaterContainerImage;
  }

  copy(): WaterItem {
    return new WaterItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
      recordId: this.recordId,
    });
  }
}
