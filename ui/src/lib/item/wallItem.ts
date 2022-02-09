import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import {
  findClosestWallPointToInteriorItem,
  itemHasHorizontalOrientation,
  itemHasVerticalOrientation,
} from '../geometry/geometry';
import ItemList from '../itemList';
import Playground from '../playground';
import { Point } from '../point';
import PlaceableItem, {
  IPlaceableItem,
  PlacementShadow,
} from './placeableItem';

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

  drag(position: Point, items: ItemList, playground: Playground) {
    if (!playground.plan) throw new Error('Playground missing plan!');
    const room = playground.plan.room;
    if (!room) throw new Error('Playground missing room!');

    this.x = position.x;
    this.y = position.y;
    this.placementShadow = this.createPlacementShadowOnClosestWall(playground);
    const { shadowColliding } = this.detectCollisions(items, playground);

    this.placementShadow = {
      ...this.placementShadow,
      isColliding: shadowColliding,
    };
  }

  createPlacementShadowOnClosestWall(playground: Playground): PlacementShadow {
    if (!playground || !playground.plan || !playground.plan.room)
      throw new Error('Missing room!');

    const { stickingTo, position: wallPosition } =
      findClosestWallPointToInteriorItem(this, playground.plan.room);

    if (stickingTo === 'left' || stickingTo === 'right') {
      if (itemHasVerticalOrientation(this)) {
        return {
          x: wallPosition.x - this.width / 2,
          y: wallPosition.y,
          width: this.width,
          height: this.height,
          length: this.length,
          isColliding: false,
        };
      } else {
        return {
          x: wallPosition.x - this.length / 2,
          y: wallPosition.y,
          width: this.length,
          height: this.height,
          length: this.width,
          isColliding: false,
        };
      }
    } else {
      if (itemHasHorizontalOrientation(this)) {
        return {
          x: wallPosition.x,
          y: wallPosition.y - this.length / 2,
          width: this.width,
          height: this.height,
          length: this.length,
          isColliding: false,
        };
      } else {
        return {
          x: wallPosition.x,
          y: wallPosition.y - this.width / 2,
          width: this.length,
          height: this.height,
          length: this.width,
          isColliding: false,
        };
      }
    }
  }
}
