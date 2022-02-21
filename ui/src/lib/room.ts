export interface IRoom {
  width?: number;
  length?: number;
  height?: number;
}

export default class Room implements IRoom {
  width: number;
  length: number;
  height?: number;

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
