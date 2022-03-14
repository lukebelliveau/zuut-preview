import PlaceableItem, {
  CollisionState,
  Layer,
  PlacementShadow,
} from './placeableItem';
import { v4 } from 'uuid';
import { Item } from '../item';
import { isStraddlingBoundary } from '../geometry/geometry';
import { isGrowspace } from './growspace';
import { isGrowspaceItem as isPlaceableItem } from './growspaceItem';
import CeilingPlaceableItem from './ceilingPlaceableItem';

export const CEILING_GROWSPACE_ITEM_TYPE = 'CeilingGrowspaceItem';

export function isCeilingGrowspaceItem(
  item: Item
): item is CeilingGrowspaceItem {
  return item instanceof CeilingGrowspaceItem;
}

export default class CeilingGrowspaceItem extends CeilingPlaceableItem {
  type = CEILING_GROWSPACE_ITEM_TYPE;
  layer = Layer.CEILING;

  copy(): CeilingGrowspaceItem {
    return new CeilingGrowspaceItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height
    );
  }

  collisionStateBetween(
    item: PlaceableItem | PlacementShadow,
    otherItem: PlaceableItem
  ): CollisionState {
    if (isGrowspace(otherItem)) {
      return isStraddlingBoundary(item, otherItem)
        ? CollisionState.CONFLICTED
        : CollisionState.NEUTRAL;
    } else if (isPlaceableItem(otherItem)) {
      return CollisionState.NEUTRAL;
    }
    return super.collisionStateBetween(this, otherItem);
  }
}
