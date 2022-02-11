import { v4 } from 'uuid';
import { isGrowspace } from '../item';
import PlaceableItem, { PlacementShadow } from './placeableItem';

export const GROWSPACE_ITEM_TYPE = 'GrowspaceItem';

export default class GrowspaceItem extends PlaceableItem {
  type: string = GROWSPACE_ITEM_TYPE;

  copy(): GrowspaceItem {
    return new GrowspaceItem(
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
    if (isGrowspace(otherItem)) return false;

    return super.isCollidingWith(this, otherItem);
  }
}