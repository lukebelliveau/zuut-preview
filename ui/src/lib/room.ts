import { Point } from './point';

export interface IRoom {
  width?: number;
  length?: number;
  height?: number;
  offset: Point;
}

export default class Room implements IRoom {
  width: number;
  length: number;
  height?: number;
  offset: Point = { x: 0, y: 0};

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
}
