import { GeometryObject } from './geometry/geometry';
import { Point } from './point';

export interface IRoom {
  width?: number;
  length?: number;
  height?: number;
  offset: Point;
}

export default class Room implements IRoom, GeometryObject {
  width: number;
  length: number;
  height?: number;
  offset: Point = { x: 0, y: 0 };

  constructor(width: number, length: number, height?: number) {
    this.width = width;
    this.length = length;
    this.height = height;
  }

  get x(): number {
    return 0;
  }
  get y(): number {
    return 0;
  }

  get northWest(): Point {
    return { x: 0, y: 0 };
  }

  get northEast(): Point {
    return { x: this.width, y: 0 };
  }

  get southWest(): Point {
    return { x: 0, y: this.length };
  }

  get southEast(): Point {
    return { x: this.width, y: this.length };
  }
}
