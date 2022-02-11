import { v4 } from 'uuid';
import { areColliding, rotated90Degrees } from '../geometry/geometry';
import ItemList from '../itemList';
import Playground from '../playground';
import { Point } from '../point';

export interface IPlaceableItem {
  place(position: Point): void;
  drag(position: Point, items: ItemList, playground: Playground): void;
  drop(items: ItemList, playground: Playground): boolean;
  copy(): PlaceableItem;
  updateCollisions(items: ItemList, playground: Playground): void;
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;
  placementShadow: PlacementShadow | undefined;
  isColliding: boolean;
}

export interface PlacementShadow {
  x: number;
  y: number;
  height: number | undefined;
  width: number;
  length: number;
  isColliding: boolean;
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
  isColliding: boolean;
  placementShadow: PlacementShadow | undefined;

  constructor(
    name: string,
    id: string = v4(),
    x: number = 0,
    y: number = 0,
    width: number = 610,
    length: number = 610,
    height: number = 915,
    isColliding: boolean = false,
    placementShadow: PlacementShadow | undefined = undefined
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

  place(position: Point) {
    this.x = position.x;
    this.y = position.y;
  }

  drag(position: Point, items: ItemList, playground: Playground) {
    if (!playground || !playground.plan || !playground.plan.grid)
      throw new Error('Missing grid!');
    this.x = position.x;
    this.y = position.y;

    this.placementShadow = this.createDefaultPlacementShadow(
      position,
      playground
    );

    this.updateCollisions(items, playground);
  }

  drop(items: ItemList, playground: Playground) {
    if (this.placementShadow) {
      this.x = this.placementShadow.x;
      this.y = this.placementShadow.y;
      this.length = this.placementShadow.length;
      this.height = this.placementShadow.height;
      this.width = this.placementShadow.width;
      this.updateCollisions(items, playground);
      this.placementShadow = undefined;
      return true;
    } else {
      return false;
    }
  }

  createDefaultPlacementShadow(
    position: Point,
    playground: Playground
  ): PlacementShadow {
    if (!playground || !playground.plan || !playground.plan.grid)
      throw new Error('Missing grid!');

    const snappedPosition = playground.plan.grid.snapPostition(position);
    const placementShadow: PlacementShadow = {
      x: snappedPosition.x,
      y: snappedPosition.y,
      width: this.width,
      length: this.length,
      height: this.height,
      isColliding: false,
    };

    return placementShadow;
  }

  updateCollisions(items: ItemList, playground: Playground) {
    const { collidingWithItem, collidingWithShadow } = this.detectCollisions(
      items,
      playground
    );

    const isColliding = collidingWithItem.some((collidingItem) => {
      if (this.id === collidingItem.id) return false;
      if (this.isCollidingWith(this, collidingItem)) {
        return true;
      }
      return false;
    });
    const shadowIsColliding = collidingWithShadow.some((collidingItem) => {
      if (
        this.placementShadow &&
        this.isCollidingWith(this.placementShadow, collidingItem)
      ) {
        return true;
      }
      return false;
    });

    this.isColliding = isColliding;
    if (this.placementShadow)
      this.placementShadow = {
        ...this.placementShadow,
        isColliding: shadowIsColliding,
      };
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  protected detectCollisions(
    items: ItemList,
    playground: Playground
  ): {
    collidingWithItem: PlaceableItem[];
    collidingWithShadow: PlaceableItem[];
  } {
    let collidingWithItem: PlaceableItem[] = [];
    let collidingWithShadow: PlaceableItem[] = [];

    items.forEach((itemToCompare) => {
      if (itemToCompare.id === this.id) return;
      if (areColliding(this, itemToCompare))
        collidingWithItem.push(itemToCompare);

      if (
        this.placementShadow &&
        areColliding(this.placementShadow, itemToCompare)
      ) {
        collidingWithShadow.push(itemToCompare);
      }
    });

    return {
      collidingWithItem: collidingWithItem,
      collidingWithShadow: collidingWithShadow,
    };
  }

  isCollidingWith(
    item: PlaceableItem | PlacementShadow,
    otherItem: PlaceableItem
  ): boolean {
    // default to "bad" collision state if any items are colliding
    return areColliding(item, otherItem);
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
