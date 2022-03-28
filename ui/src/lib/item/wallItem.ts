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
import { Item } from '../item';
import ItemList from '../itemList';
import Playground from '../playground';
import { Point } from '../point';
import PlaceableItem, {
  CollisionState,
  IPlaceableItem,
  PlacementShadow,
} from './placeableItem';

export const WALL_ITEM_TYPE = 'WallItem';

export function isWallItem(item: Item): item is WallItem {
  return (item as WallItem).type === WALL_ITEM_TYPE;
}

export default class WallItem extends PlaceableItem implements IPlaceableItem {
  type: string = WALL_ITEM_TYPE;

  copy(): WallItem {
    return new WallItem(
      this.name,
      v4(),
      this.x,
      this.y,
      feetToMm(0.2),
      feetToMm(2),
      this.height
    );
  }

  drag(position: Point, items: ItemList, playground: Playground) {
    if (!playground.plan) throw new Error('Playground missing plan!');
    const room = playground.plan.room;
    if (!room) throw new Error('Playground missing room!');

    this.x = position.x;
    this.y = position.y;
    this.placementShadow = this.createPlacementShadowOnClosestWall(playground);
    this.updateCollisions(items, playground);
  }

  createPlacementShadowOnClosestWall(playground: Playground): PlacementShadow {
    if (!playground || !playground.plan || !playground.plan.room)
      throw new Error('Missing room!');

    const { stickingTo, position: wallPosition } =
      findClosestWallPointToInteriorItem(this, playground.plan.room);

    if (stickingTo === 'left' || stickingTo === 'right') {
      if (itemHasVerticalOrientation(this)) {
        const offsetObject = {
          x: wallPosition.x - this.width / 2,
          y: wallPosition.y,
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
