export default class Room {
  widthMm: number;
  lengthMm: number;
  heightMm: number;

  constructor(widthMm: number, lengthMm: number, heightMm: number) {
    this.widthMm = widthMm;
    this.lengthMm = lengthMm;
    this.heightMm = heightMm;
  }

  get xOffsetMm(): number {
    return 0;
  }
  get yOffsetMm(): number {
    return 0;
  }
}