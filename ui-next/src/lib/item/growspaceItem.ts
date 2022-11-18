import { v4 } from 'uuid';

import { isStraddlingBoundary } from '../geometry/geometry';
import { Item } from '../item';
import { isCeilingPlaceableItem } from './ceilingPlaceableItem';
import { isTentItem } from './tentItem';
import PlaceableItem, {
  CollisionState,
  PlacementShadow,
} from './placeableItem';

export const GROWSPACE_ITEM_TYPE = 'GrowspaceItem';

export function isGrowspaceItem(item: Item): item is GrowspaceItem {
  // returns true if GrowspaceItem *or* subclass of GrowspaceItem
  return item instanceof GrowspaceItem;
}

export default class GrowspaceItem extends PlaceableItem {
  type: string = GROWSPACE_ITEM_TYPE;

  copy(): GrowspaceItem {
    return new GrowspaceItem(this.copyArgs());
  }

  copyWithModifiers(): GrowspaceItem {
    return new GrowspaceItem(this.copyArgsWithModifiers());
  }

  collisionStateBetween(
    item: PlaceableItem | PlacementShadow,
    otherItem: PlaceableItem
  ): CollisionState {
    if (isTentItem(otherItem)) {
      return isStraddlingBoundary(item, otherItem)
        ? CollisionState.CONFLICTED
        : CollisionState.NEUTRAL;
    } else if (isCeilingPlaceableItem(otherItem)) {
      return CollisionState.NEUTRAL;
    }

    return super.collisionStateBetween(this, otherItem);
  }
}
