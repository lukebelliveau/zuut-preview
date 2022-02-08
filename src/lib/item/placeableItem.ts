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
  isColliding: boolean = false;
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
      this.isColliding = this.detectCollisions(items, playground).itemColliding;
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
    const placementShadow = {
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
    const { itemColliding, shadowColliding } = this.detectCollisions(
      items,
      playground
    );

    this.isColliding = itemColliding;
    if (this.placementShadow)
      this.placementShadow = {
        ...this.placementShadow,
        isColliding: shadowColliding,
      };
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  protected detectCollisions(
    items: ItemList,
    playground: Playground
  ): {
    itemColliding: boolean;
    shadowColliding: boolean;
  } {
    let itemColliding = false;
    let shadowColliding = false;
    items.forEach((itemToCompare) => {
      if (itemToCompare.id === this.id) return;
      if (areColliding(this, itemToCompare)) itemColliding = true;

      if (
        this.placementShadow &&
        areColliding(this.placementShadow, itemToCompare)
      ) {
        shadowColliding = true;
      }
    });

    return {
      itemColliding,
      shadowColliding,
    };
  }

  isCollidingWith(otherItem: PlaceableItem): boolean {
    if (otherItem.id === this.id) return false;

    return areColliding(this, otherItem);
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
