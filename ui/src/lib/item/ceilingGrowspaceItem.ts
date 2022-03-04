import PlaceableItem, { Layer, PlacementShadow } from './placeableItem';
import { v4 } from 'uuid';
import { isGrowspace, isGrowspaceItem } from '../item';
import { isStraddlingBoundary } from '../geometry/geometry';

export const CEILING_GROWSPACE_ITEM_TYPE = 'CeilingGrowspaceItem';

export default class CeilingGrowspaceItem extends PlaceableItem {
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

  isCollidingWith(
    item: PlaceableItem | PlacementShadow,
    otherItem: PlaceableItem
  ): boolean {
    if (isGrowspace(otherItem)) {
      return isStraddlingBoundary(item, otherItem);
    } else if (isGrowspaceItem(otherItem)) {
      return false;
    }
    return super.isCollidingWith(this, otherItem);
  }
}
