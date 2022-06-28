import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import WaterContainerImage from '../../images/items/water_container.png';

export const WATER_ITEM_TYPE = 'WaterItemType';

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
    modifiers: Modifiers = defaultWaterModifiers,
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
    return WaterContainerImage;
  }

  copy(): WaterItem {
    return new WaterItem(
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
