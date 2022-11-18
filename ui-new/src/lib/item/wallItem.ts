import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import {
  computeNorthEast,
  computeNorthWest,
  computeSouthEast,
  computeSouthWest,
  findClosestWallPointToInteriorItem,
  itemHasHorizontalOrientation,
  itemHasVerticalOrientation,
} from '../geometry/geometry';
import { IItem, Item } from '../item';
import Playground from '../playground';
import { Point } from '../point';
import PlaceableItem, { CollisionState, IPlaceableItem, PlacementShadow } from './placeableItem';

export const WALL_ITEM_TYPE = 'WallItem';

export function isWallItem(item: Item): item is WallItem {
  return item instanceof WallItem;
}

export default class WallItem extends PlaceableItem implements IPlaceableItem {
  type: string = WALL_ITEM_TYPE;

  copy(): WallItem {
    return new WallItem(this.copyArgs());
  }

  copyWithModifiers(): WallItem {
    return new WallItem(this.copyArgsWithModifiers());
  }

  drag(position: Point, items: IItem[], playground: Playground) {
    if (!playground.plan) throw new Error('Playground missing plan!');
    const { room } = playground.plan;
    if (!room) throw new Error('Playground missing room!');

    this.x = position.x;
    this.y = position.y;
    this.placementShadow = this.createPlacementShadowOnClosestWall(playground);
    this.updateCollisions(items, playground);
  }

  isCollidingWithPlanWall() {
    return false;
  }

  createPlacementShadowOnClosestWall(playground: Playground): PlacementShadow {
    if (!playground || !playground.plan || !playground.plan.room) throw new Error('Missing room!');

    const { stickingTo, position: wallPosition } = findClosestWallPointToInteriorItem(
      this,
      playground.plan.room
    );

    if (stickingTo === 'left' || stickingTo === 'right') {
      if (itemHasVerticalOrientation(this)) {
        const offsetObject = {
          x: wallPosition.x - this.width / 2,
          y: wallPosition.y,
          width: this.width,
          length: this.length,
          offset: this.offset,
        };
        return {
          ...offsetObject,
          width: this.width,
          height: this.height,
          length: this.length,
          collisionState: CollisionState.NEUTRAL,
          northWest: computeNorthWest(offsetObject),
          northEast: computeNorthEast(offsetObject),
          southWest: computeSouthWest(offsetObject),
          southEast: computeSouthEast(offsetObject),
        };
      } else {
        const offsetObject = {
          x: wallPosition.x - this.length / 2,
          y: wallPosition.y,
          width: this.width,
          length: this.length,
          offset: this.offset,
        };
        return {
          ...offsetObject,
          width: this.length,
          height: this.height,
          length: this.width,
          collisionState: CollisionState.NEUTRAL,
          northWest: computeNorthWest(offsetObject),
          northEast: computeNorthEast(offsetObject),
          southWest: computeSouthWest(offsetObject),
          southEast: computeSouthEast(offsetObject),
        };
      }
    } else {
      if (itemHasHorizontalOrientation(this)) {
        const offsetObject = {
          x: wallPosition.x,
          y: wallPosition.y - this.length / 2,
          width: this.width,
          length: this.length,
          offset: this.offset,
        };

        return {
          ...offsetObject,
          width: this.width,
          height: this.height,
          length: this.length,
          collisionState: CollisionState.NEUTRAL,
          northWest: computeNorthWest(offsetObject),
          northEast: computeNorthEast(offsetObject),
          southWest: computeSouthWest(offsetObject),
          southEast: computeSouthEast(offsetObject),
        };
      } else {
        const offsetObject = {
          x: wallPosition.x,
          y: wallPosition.y - this.width / 2,
          width: this.width,
          length: this.length,
          offset: this.offset,
        };

        return {
          ...offsetObject,
          width: this.length,
          height: this.height,
          length: this.width,
          collisionState: CollisionState.NEUTRAL,
          northWest: computeNorthWest(offsetObject),
          northEast: computeNorthEast(offsetObject),
          southWest: computeSouthWest(offsetObject),
          southEast: computeSouthEast(offsetObject),
        };
      }
    }
  }

  get offset(): Point {
    return {
      x: 0,
      y: 0,
    };
  }

  get northWest(): Point {
    return {
      x: this.x,
      y: this.y,
    };
  }

  get northEast(): Point {
    return {
      x: this.x + this.width,
      y: this.y,
    };
  }

  get southWest(): Point {
    return {
      x: this.x,
      y: this.y + this.length,
    };
  }

  get southEast(): Point {
    return {
      x: this.x + this.width,
      y: this.y + this.length,
    };
  }
}
