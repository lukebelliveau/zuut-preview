import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlacementShadow,
} from './placeableItem';
import CarbonFilterImage from '../../images/items/carbonFilter/carbonFilter.svg';
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
    modifiers: Modifiers = defaultFilterModifiers,
    collisionState: CollisionState = CollisionState.NEUTRAL,
    placementShadow: PlacementShadow | undefined = undefined
  ) {
    super(
      name,
      id,
      x,
      y,
      width,
      length,
      height,
      description,
      rotation,
      modifiers,
      collisionState,
      placementShadow
    );
  }

  get image() {
    return CarbonFilterImage;
  }

  copy(): CarbonFilterItem {
    return new CarbonFilterItem(
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
