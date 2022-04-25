import { v4 } from 'uuid';

import { isStraddlingBoundary } from '../geometry/geometry';
import PlaceableItem, {
  CollisionState,
  PlacementShadow,
} from './placeableItem';
import { Item } from '../item';
import { isGrowspaceItem } from './growspaceItem';
import { isCeilingGrowspaceItem } from './ceilingGrowspaceItem';
import { Layer } from '../layer';
import { isDuctItem } from './ductItem';
import GrowspaceImage from '../../images/items/growspace.svg';

export const GROWSPACE_TYPE = 'Growspace';

export function isGrowspace(item: Item): item is Growspace {
  return (item as Growspace).type === GROWSPACE_TYPE;
}

export default class Growspace extends PlaceableItem {
  type: string = GROWSPACE_TYPE;
  layer = Layer.FLOOR;
  description = 'Place a tent to start your grow.';

  get image() {
    return GrowspaceImage;
  }

  copy(): Growspace {
    return new Growspace(
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

  collisionStateBetween(
    item: PlaceableItem | PlacementShadow,
    otherItem: PlaceableItem
  ): CollisionState {
    if (isGrowspaceItem(otherItem) || isCeilingGrowspaceItem(otherItem)) {
      return isStraddlingBoundary(otherItem, item)
        ? CollisionState.CONFLICTED
        : CollisionState.NEUTRAL;
    } else if (isDuctItem(otherItem)) {
      return CollisionState.NEUTRAL;
    }

    return super.collisionStateBetween(this, otherItem);
  }
}
