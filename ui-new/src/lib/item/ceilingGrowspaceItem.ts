import PlaceableItem, { CollisionState, PlacementShadow } from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import { isStraddlingBoundary } from '../geometry/geometry';
import { isTentItem } from './tentItem';
import { isGrowspaceItem as isPlaceableItem } from './growspaceItem';
import CeilingPlaceableItem from './ceilingPlaceableItem';

export const CEILING_GROWSPACE_ITEM_TYPE = 'CeilingGrowspaceItem';

export function isCeilingGrowspaceItem(item: Item): item is CeilingGrowspaceItem {
  return item instanceof CeilingGrowspaceItem;
}

export default class CeilingGrowspaceItem extends CeilingPlaceableItem {
  type = CEILING_GROWSPACE_ITEM_TYPE;

  copy(): CeilingGrowspaceItem {
    return new CeilingGrowspaceItem(this.copyArgs());
  }

  copyWithModifiers(): CeilingGrowspaceItem {
    return new CeilingGrowspaceItem(this.copyArgsWithModifiers());
  }

  collisionStateBetween(
    item: PlaceableItem | PlacementShadow,
    otherItem: PlaceableItem
  ): CollisionState {
    if (isTentItem(otherItem)) {
      return isStraddlingBoundary(item, otherItem)
        ? CollisionState.CONFLICTED
        : CollisionState.NEUTRAL;
    } else if (isPlaceableItem(otherItem)) {
      return CollisionState.NEUTRAL;
    }
    return super.collisionStateBetween(this, otherItem);
  }
}
