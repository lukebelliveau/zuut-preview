import { v4 } from 'uuid';
import { isStraddlingBoundary } from '../geometry/geometry';
import { isCeilingGrowspaceItem, isGrowspaceItem } from '../item';
import PlaceableItem, { Layer, PlacementShadow } from './placeableItem';

export const GROWSPACE_TYPE = 'Growspace';

export default class Growspace extends PlaceableItem {
  type: string = GROWSPACE_TYPE;
  layer = Layer.FLOOR;

  copy(): Growspace {
    return new Growspace(
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
    if (isGrowspaceItem(otherItem) || isCeilingGrowspaceItem(otherItem)) {
      return isStraddlingBoundary(otherItem, item);
    }

    return super.isCollidingWith(this, otherItem);
  }
}
