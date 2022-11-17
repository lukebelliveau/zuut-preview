import { v4 } from 'uuid';
import { IItem, Item } from '../item';
import {
  CollisionState,
  IPlaceableItem,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import DuctImage from '../../assets/items/straight_duct.png';
import { isWindowItem } from './windowitem';
import CeilingPlaceableItem from './ceilingPlaceableItem';
import { isCeilingGrowspaceItem } from './ceilingGrowspaceItem';
import Playground from '../playground';
import { areExactlySharingBorder } from '../geometry/geometry';
import { isTentItem } from './tentItem';
import { initRopeRatchets } from './initModifiers';

export const DUCT_ITEM_TYPE = 'DuctItem';

export function isDuctItem(item: Item): item is DuctItem {
  return item instanceof DuctItem;
}

const defaultDuctModifiers = { 'Rope Ratchets': initRopeRatchets() };

export default class DuctItem extends CeilingPlaceableItem {
  type = DUCT_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    amazonProducts,
    selectedAmazonASIN,
    recordId,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    modifiers = defaultDuctModifiers,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({
      name,
      id,
      amazonProducts,
      x,
      y,
      width,
      length,
      height,
      description,
      rotation,
      modifiers,
      collisionState,
      placementShadow,
      recordId,
      selectedAmazonASIN,
    });
  }

  get image() {
    return DuctImage;
  }

  copy(): DuctItem {
    return new DuctItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      recordId: this.recordId,
      amazonProducts: this.amazonProducts,
      selectedAmazonASIN: this.selectedAmazonASIN,
    });
  }

  copyWithModifiers(): DuctItem {
    return new DuctItem({
      name: this.name,
      id: v4(),
      x: this.xPlus50(),
      y: this.yPlus50(),
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      modifiers: this.modifiers,
      recordId: this.recordId,
      amazonProducts: this.amazonProducts,
      selectedAmazonASIN: this.selectedAmazonASIN,
    });
  }

  updateCollisions(items: IItem[], playground: Playground) {
    const { collidingWithItem, collidingWithShadow } = this.detectOverlaps(items, playground);

    const { sharingBorderWithItem, sharingBorderWithShadow } = this.detectSharingBorders(items);

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
      const itemHasConnectionsWithSharedBorder = sharingBorderWithItem.some((collidingItem) => {
        if (this.collisionStateBetween(this, collidingItem) === CollisionState.CONNECTED) {
          return true;
        }
        return false;
      });

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
    } else if (isTentItem(otherItem)) {
      return CollisionState.NEUTRAL;
    }

    return super.collisionStateBetween(this, otherItem);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  isCollidingWithPlanWall() {
    return false;
  }
}
