import { feetToMm } from './conversions';
import { Point } from './point';

export default class Grid {
  width: number;
  length: number;
  snapInterval: number;

  constructor(
    width: number,
    length: number,
    snapInterval: number = feetToMm(0.5)
  ) {
    this.width = width;
    this.length = length;
    this.snapInterval = snapInterval;
  }

  snapPostition(position: Point): Point {
    return {
      x: Math.round(position.x / this.snapInterval) * this.snapInterval,
      y: Math.round(position.y / this.snapInterval) * this.snapInterval,
    };
  }

  get verticalLines(): number[][] {
    const lines = [];
    for (let i = 0; i < this.width / this.snapInterval; i++) {
      lines.push([
        i * this.snapInterval,
        0,
        i * this.snapInterval,
        this.length,
      ]);
    }
    return lines;
  }

  get horizontalLines(): number[][] {
    const lines = [];
    for (let i = 0; i < this.length / this.snapInterval; i++) {
      lines.push([0, i * this.snapInterval, this.width, i * this.snapInterval]);
    }
    return lines;
  }

  get lines(): number[][] {
    return this.verticalLines.concat(this.horizontalLines);
  }
}
