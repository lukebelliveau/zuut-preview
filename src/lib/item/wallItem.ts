import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import {
  itemHasHorizontalOrientation,
  itemHasVerticalOrientation,
  itemIsAlignedWithBottomWall,
  itemIsAlignedWithLeftWall,
  itemIsAlignedWithRightWall,
  itemIsAlignedWithTopWall,
  itemIsBetweenLeftAndRightWall,
  itemIsBetweenTopAndBottomWall,
  placedOnBottomBoundary,
  placedOnLeftBoundary,
  placedOnRightBoundary,
  placedOnTopBoundary,
  rotated90Degrees,
} from '../geometry/geometry';
import ItemList from '../itemList';
import Playground from '../playground';
import { Point } from '../point';
import Room from '../room';
import PlaceableItem, { IPlaceableItem } from './placeableItem';

export const WALL_ITEM_TYPE = 'WallItem';

export default class WallItem extends PlaceableItem implements IPlaceableItem {
  type: string = WALL_ITEM_TYPE;

  copy(): WallItem {
    return new WallItem(
      this.name,
      v4(),
      this.x,
      this.y,
      feetToMm(0.1),
      feetToMm(2),
      this.height
    );
  }

  isPlacedOnBottomWall(room: Room): boolean {
    return (
      itemIsAlignedWithBottomWall(this, room) &&
      itemIsBetweenLeftAndRightWall(this, room) &&
      itemHasHorizontalOrientation(this)
    );
  }

  isPlacedOnTopWall(room: Room): boolean {
    return (
      itemIsAlignedWithTopWall(this, room) &&
      itemIsBetweenLeftAndRightWall(this, room) &&
      itemHasHorizontalOrientation(this)
    );
  }

  isPlacedOnLeftWall(room: Room): boolean {
    return (
      itemIsAlignedWithLeftWall(this, room) &&
      itemIsBetweenTopAndBottomWall(this, room) &&
      itemHasVerticalOrientation(this)
    );
  }

  isPlacedOnRightWall(room: Room): boolean {
    return (
      itemIsAlignedWithRightWall(this, room) &&
      itemIsBetweenTopAndBottomWall(this, room) &&
      itemHasVerticalOrientation(this)
    );
  }

  isPlacedOnAWall(room: Room): boolean {
    if (
      this.isPlacedOnBottomWall(room) ||
      this.isPlacedOnTopWall(room) ||
      this.isPlacedOnLeftWall(room) ||
      this.isPlacedOnRightWall(room)
    ) {
      return true;
    }

    return false;
  }

  isPlacedPerpendicularToBottomWall(room: Room): boolean {
    return (
      itemIsAlignedWithBottomWall(this, room) &&
      itemIsBetweenLeftAndRightWall(this, room) &&
      itemHasVerticalOrientation(this)
    );
  }

  isPlacedPerpendicularToTopWall(room: Room): boolean {
    return (
      itemIsAlignedWithTopWall(this, room) &&
      itemIsBetweenLeftAndRightWall(this, room) &&
      itemHasVerticalOrientation(this)
    );
  }

  isPlacedPerpendicularToLeftWall(room: Room): boolean {
    return (
      itemIsAlignedWithLeftWall(this, room) &&
      itemIsBetweenTopAndBottomWall(this, room) &&
      itemHasHorizontalOrientation(this)
    );
  }

  isPlacedPerpendicularToRightWall(room: Room): boolean {
    return (
      itemIsAlignedWithRightWall(this, room) &&
      itemIsBetweenTopAndBottomWall(this, room) &&
      itemHasHorizontalOrientation(this)
    );
  }

  handleRotation(room: Room): void {
    if (this.isPlacedPerpendicularToBottomWall(room)) {
      let rotatedShadow = rotated90Degrees(this);
      let rotatedOnBottomBoundary = placedOnBottomBoundary(rotatedShadow, room);
      this.placementShadow = rotatedOnBottomBoundary;
    } else if (this.isPlacedPerpendicularToTopWall(room)) {
      let rotatedShadow = rotated90Degrees(this);
      let rotatedOnBottomBoundary = placedOnTopBoundary(rotatedShadow, room);
      this.placementShadow = rotatedOnBottomBoundary;
    } else if (this.isPlacedPerpendicularToLeftWall(room)) {
      let rotatedShadow = rotated90Degrees(this);
      let rotatedOnBottomBoundary = placedOnLeftBoundary(rotatedShadow, room);
      this.placementShadow = rotatedOnBottomBoundary;
    } else if (this.isPlacedPerpendicularToRightWall(room)) {
      let rotatedShadow = rotated90Degrees(this);
      let rotatedOnBottomBoundary = placedOnRightBoundary(rotatedShadow, room);
      this.placementShadow = rotatedOnBottomBoundary;
    } else {
      this.placementShadow = undefined;
    }
  }

  setPosition(position: Point, items: ItemList, playground: Playground) {
    if (!playground) return super.setPosition(position, items);

    this.x = position.x;
    this.y = position.y;

    if (!playground.plan) throw new Error('Playground missing plan!');
    const room = playground.plan.room;
    if (!room) throw new Error('Playground missing room!');

    this.handleRotation(room);

    const collidingWithItems = items.some((otherItem) =>
      this.isCollidingWith(otherItem)
    );

    const placedOnWall = this.isPlacedOnAWall(room);

    this.isColliding = !placedOnWall && !collidingWithItems;
  }
}
