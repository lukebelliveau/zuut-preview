export default class Growspace {
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;

  constructor(x: number, y: number, width: number, length: number, height: number | undefined) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
  }
}