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
    return new CeilingGrowspaceItem({
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

  copyWithModifiers(): CeilingGrowspaceItem {
    return new CeilingGrowspaceItem({
      name: this.name,
      id: v4(),
      x: this.xPlus50(),
      y: this.yPlus50(),
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
      modifiers: this.modifiers,
    });
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
