import { v4 } from 'uuid';

import { isStraddlingBoundary } from '../geometry/geometry';
import PlaceableItem, {
  CollisionState,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import { Item } from '../item';
import { isGrowspaceItem } from './growspaceItem';
import { isCeilingGrowspaceItem } from './ceilingGrowspaceItem';
import { Layer } from '../layer';
import { isDuctItem } from './ductItem';
import GrowspaceImage from '../../images/items/tent.png';
import { LayerState } from '../../features/interactions/interactionsState';

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
    return new Growspace({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
    });
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

  /**
   * Growspaces should be opaque as long as one of the layers is enabled.
   */
  opacity(layerState: LayerState): number {
    if (this.placementShadow) return 0.2;

    if (layerState[Layer.FLOOR] || layerState[Layer.CEILING]) return 1;

    return 0.2;
  }
}
