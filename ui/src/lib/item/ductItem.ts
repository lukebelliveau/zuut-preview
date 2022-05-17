import { v4 } from 'uuid';
import { IItem, Item } from '../item';
import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlacementShadow,
} from './placeableItem';
import DuctImage from '../../images/items/duct.svg';
import { isWindowItem } from './windowitem';
import CeilingPlaceableItem from './ceilingPlaceableItem';
import { isCeilingGrowspaceItem } from './ceilingGrowspaceItem';
import Playground from '../playground';
import { areExactlySharingBorder } from '../geometry/geometry';
import { isGrowspace } from './growspace';
import { feetToMm, normalizeMmTo3InchesIfEnabled } from '../conversions';

export const DUCT_ITEM_TYPE = 'DuctItem';

export function isDuctItem(item: Item): item is DuctItem {
  return item instanceof DuctItem;
}

const defaultDuctModifiers = { 'Rope Ratchets': [] };

export default class DuctItem extends CeilingPlaceableItem {
  type = DUCT_ITEM_TYPE;

  constructor(
    name: string,
    id: string = v4(),
    x: number = 0,
    y: number = 0,
    width: number = 610,
    length: number = 610,
    height: number = 915,
    description: string = '',
    rotation: number = 0,
    modifiers: Modifiers = defaultDuctModifiers,
    collisionState: CollisionState = CollisionState.NEUTRAL,
    placementShadow: PlacementShadow | undefined = undefined
  ) {
    super(
      name,
      id,
      x,
      y,
      width,
      length,
      height,
      description,
      rotation,
      modifiers,
      collisionState,
      placementShadow
    );
  }

  get image() {
    return DuctImage;
  }

  copy(): DuctItem {
    return new DuctItem(
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

  updateCollisions(items: IItem[], playground: Playground) {
    // console.log('DUCT - UPDATE COLLISIONS!');
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
    } else if (isGrowspace(otherItem)) {
      return CollisionState.NEUTRAL;
    }

    return super.collisionStateBetween(this, otherItem);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  isCollidingWithPlanWall() {
    return false;
  }
}
