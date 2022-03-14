import { v4 } from 'uuid';
import { Item } from '../item';
import {
  CollisionState,
  IPlaceableItem,
  Layer,
  PlacementShadow,
} from './placeableItem';
import DuctImage from '../../images/items/duct.png';
import { isWindowItem } from './windowitem';
import CeilingPlaceableItem from './ceilingPlaceableItem';
import { isCeilingGrowspaceItem } from './ceilingGrowspaceItem';
import ItemList from '../itemList';
import Playground from '../playground';
import { areExactlySharingBorder } from '../geometry/geometry';

export const DUCT_ITEM_TYPE = 'DuctItem';

export function isDuctItem(item: Item): item is DuctItem {
  return item instanceof DuctItem;
}

export default class DuctItem extends CeilingPlaceableItem {
  type = DUCT_ITEM_TYPE;
  image = DuctImage;
  layer = Layer.CEILING;

  copy(): DuctItem {
    return new DuctItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height
    );
  }

  updateCollisions(items: ItemList, playground: Playground) {
    const { collidingWithItem, collidingWithShadow } = this.detectOverlaps(
      items,
      playground
    );

    const { sharingBorderWithItem, sharingBorderWithShadow } =
      this.detectSharingBorders(items);

    /**
     * ducts must be attached to something
     */
    if (
      collidingWithItem.length < 1 &&
      collidingWithShadow.length < 1 &&
      sharingBorderWithItem.length < 1 &&
      sharingBorderWithShadow.length < 1
    ) {
      this.collisionState = CollisionState.CONFLICTED;
      if (this.placementShadow) {
        this.placementShadow = {
          ...this.placementShadow,
          collisionState: CollisionState.CONFLICTED,
        };
      }
    } else if (this.itemHasConflicts(collidingWithItem)) {
      this.collisionState = CollisionState.CONFLICTED;
      if (this.placementShadow) {
        this.placementShadow = {
          ...this.placementShadow,
          collisionState: CollisionState.CONFLICTED,
        };
      }
    } else {
      const itemHasConnectionsWithSharedBorder = sharingBorderWithItem.some(
        (collidingItem) => {
          if (
            this.collisionStateBetween(this, collidingItem) ===
            CollisionState.CONNECTED
          ) {
            return true;
          }
          return false;
        }
      );

      if (itemHasConnectionsWithSharedBorder) {
        this.collisionState = CollisionState.CONNECTED;
        if (this.placementShadow) {
          this.placementShadow = {
            ...this.placementShadow,
            collisionState: CollisionState.CONNECTED,
          };
        }
      } else {
        super.updateCollisions(items, playground);
      }
    }
  }

  collisionStateBetween(
    item: PlacementShadow | IPlaceableItem,
    otherItem: IPlaceableItem
  ): CollisionState {
    if (isCeilingGrowspaceItem(otherItem)) {
      return CollisionState.CONFLICTED;
    } else if (isDuctItem(otherItem)) {
      if (
        otherItem.collisionState === CollisionState.CONNECTED &&
        areExactlySharingBorder(item, otherItem)
      ) {
        return CollisionState.CONNECTED;
      } else {
        return CollisionState.CONFLICTED;
      }
    } else if (isWindowItem(otherItem)) {
      return CollisionState.CONNECTED;
    }

    return super.collisionStateBetween(this, otherItem);
  }
}
