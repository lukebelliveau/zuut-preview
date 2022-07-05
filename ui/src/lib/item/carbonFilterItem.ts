import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import CarbonFilterImage from '../../images/items/carbon_filter.png';
import { v4 } from 'uuid';
import { Item } from '../item';
import { feetToMm } from '../conversions';

export const CARBON_FILTER_ITEM_TYPE = 'CarbonFilterItemType';

export function isCarbonFilterItem(item: Item): item is CarbonFilterItem {
  return (item as CarbonFilterItem).type === CARBON_FILTER_ITEM_TYPE;
}

const defaultFilterModifiers = { 'Rope Ratchets': [] };

export default class CarbonFilterItem
  extends CeilingGrowspaceItem
  implements IPlaceableItem
{
  type = CARBON_FILTER_ITEM_TYPE;

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
    modifiers = defaultFilterModifiers,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({
      name,
      id,
      ASIN,
      x,
      y,
      width,
      length,
      height,
      description,
      rotation,
      modifiers,
      collisionState,
      placementShadow,
    });
  }

  get image() {
    return CarbonFilterImage;
  }

  copy(): CarbonFilterItem {
    return new CarbonFilterItem({
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
