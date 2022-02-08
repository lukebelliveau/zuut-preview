import { v4 } from 'uuid';
import { GeometryObject, rotated90Degrees } from '../geometry/geometry';
import ItemList from '../itemList';
import Playground from '../playground';
import { Point } from '../point';

export interface IPlaceableItem {
  setPosition(position: Point, items: ItemList, playground?: Playground): void;
  drop(position: Point, items: ItemList, playground?: Playground): void;
  isCollidingWith(otherItem: PlaceableItem): boolean;
  copy(): PlaceableItem;
}

export default class PlaceableItem implements IPlaceableItem {
  id: string;
  type: string = 'PlaceableItem';
  name: string;
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;
  isColliding: boolean = false;
  placementShadow: GeometryObject | undefined;

  constructor(
    name: string,
    id: string = v4(),
    x: number = 0,
    y: number = 0,
    width: number = 610,
    length: number = 610,
    height: number = 915,
    isColliding: boolean = false,
    placementShadow: GeometryObject | undefined = undefined
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
    this.isColliding = isColliding;
    this.placementShadow = placementShadow;
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  setPosition(position: Point, items: ItemList, playground?: Playground) {
    this.x = position.x;
    this.y = position.y;
    this.detectCollisions(items);
  }

  detectCollisions(items: ItemList): void {
    this.isColliding = items.some((otherItem) =>
      this.isCollidingWith(otherItem)
    );
  }

  drop(position: Point, items: ItemList, playground?: Playground) {
    if (this.placementShadow) {
      this.x = this.placementShadow.x;
      this.y = this.placementShadow.y;
      this.length = this.placementShadow.length;
      this.height = this.placementShadow.height;
      this.width = this.placementShadow.width;
      this.placementShadow = undefined;
      this.detectCollisions(items);
    } else {
      this.setPosition(position, items, playground);
    }
  }

  isCollidingWith(otherItem: PlaceableItem): boolean {
    if (otherItem.id === this.id) return false;

    return !(
      Math.floor(otherItem.x)                    >= Math.floor(this.x + this.width) ||
      Math.floor(otherItem.x + otherItem.width)  <= Math.floor(this.x) ||
      Math.floor(otherItem.y)                    >= Math.floor(this.y + this.length) ||
      Math.floor(otherItem.y + otherItem.length) <= Math.floor(this.y)
    );
  }

  rotate90Degrees() {
    const { width, length } = rotated90Degrees(this);
    this.width = width;
    this.length = length;
  }

  copy(): PlaceableItem {
    return new PlaceableItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height
    );
  }
}
