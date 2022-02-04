import { v4 } from 'uuid';
import ItemList from '../itemList';
import Playground from '../playground';
import { Point } from '../point';

export interface IPlaceableItem {
  setPosition(position: Point, items: ItemList, playground: Playground): void;
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

  constructor(
    name: string,
    id: string = v4(),
    x: number = 0,
    y: number = 0,
    width: number = 610,
    length: number = 610,
    height: number = 915,
    isColliding: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
    this.isColliding = isColliding;
  }

  // /* eslint-disable @typescript-eslint/no-unused-vars */
  setPosition(position: Point, items: ItemList, playground: Playground) {
    this.x = position.x;
    this.y = position.y;
    this.isColliding = items.some((otherItem) =>
      this.isCollidingWith(otherItem)
    );
  }

  isCollidingWith(otherItem: PlaceableItem): boolean {
    if (otherItem.id === this.id) return false;

    return !(
      otherItem.x > this.x + this.width ||
      otherItem.x + otherItem.width < this.x ||
      otherItem.y > this.y + this.length ||
      otherItem.y + otherItem.length < this.y
    );
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
