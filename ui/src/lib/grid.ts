import { Point } from './point';

const SNAP_INTERVAL = 304.8; // 12in

export default class Grid {
  width: number;
  length: number;

  constructor(width: number, length: number) {
    this.width = width;
    this.length = length;
  }

  snapPostition(position: Point): Point {
    return {
      x: Math.round(position.x / SNAP_INTERVAL) * SNAP_INTERVAL,
      y: Math.round(position.y / SNAP_INTERVAL) * SNAP_INTERVAL,
    };
  }

  get verticalLines(): number[][] {
    const lines = [];
    for (let i = 0; i < this.width / SNAP_INTERVAL; i++) {
      lines.push(
        [i * SNAP_INTERVAL, 0, i * SNAP_INTERVAL, this.length]
      );
    }
    return lines;
  }

  get horizontalLines(): number[][] {
    const lines = [];
    for (let i = 0; i < this.length / SNAP_INTERVAL; i++) {
      lines.push(
        [0, i * SNAP_INTERVAL, this.width, i * SNAP_INTERVAL]
      );
    }
    return lines;
  }

  get lines(): number[][] {
    return this.verticalLines.concat(this.horizontalLines);
  }
}