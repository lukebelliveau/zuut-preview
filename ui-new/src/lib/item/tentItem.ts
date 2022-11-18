import { v4 } from 'uuid';

import { isStraddlingBoundary } from '../geometry/geometry';
import PlaceableItem, { CollisionState, PlacementShadow } from './placeableItem';
import { Item } from '../item';
import { isGrowspaceItem } from './growspaceItem';
import { isCeilingGrowspaceItem } from './ceilingGrowspaceItem';
import { Layer } from '../layer';
import { isDuctItem } from './ductItem';
import TentImage from '../../assets/items/tent.png';
import { LayerState } from '../../redux/features/interactions/interactionsState';

export const TENT_ITEM_TYPE = 'TentItem';

export function isTentItem(item: Item): item is Tent {
  return (item as Tent).type === TENT_ITEM_TYPE;
}

export default class Tent extends PlaceableItem {
  type: string = TENT_ITEM_TYPE;
  layer = Layer.FLOOR;
  description = 'Place a tent to start your grow.';

  get image() {
    return TentImage;
  }

  copy(): Tent {
    return new Tent(this.copyArgs());
  }

  copyWithModifiers(): Tent {
    return new Tent(this.copyArgsWithModifiers());
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
