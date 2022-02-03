import { v4 } from 'uuid';
import { Point } from '../point';

export default class PlaceableItem {
  id: string;
  type: string = 'PlaceableItem';
  name: string;
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;

  constructor(name: string, id: string = v4(), x: number = 0, y: number = 0, width: number = 610, length: number = 610, height: number = 915) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
  }

  setPosition(position: Point) {
    this.x = position.x;
    this.y = position.y;
  }

  copy(): PlaceableItem {
    return new PlaceableItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height,
    );
  }
}
