import { Placement } from './placement';
import Room from '../objects/room';
import { Point } from '../point';

const DEFAULT_SCALE = 1.0 / 10_000.0;

export default class DisplaySpace {
  xMax: number;
  yMax: number;
  scale: number;
  displayTotalWidthMm: number;
  displayTotalHeightMm: number;

  constructor(xMax: number, yMax: number, displayTotalWidthMm: number, displayTotalHeightMm: number, scale: number = DEFAULT_SCALE) {
    this.xMax = xMax;
    this.yMax = yMax;
    this.displayTotalWidthMm = displayTotalWidthMm;
    this.displayTotalHeightMm = displayTotalHeightMm;
    this.scale = scale;
  }

  place(item: Room): Placement {
    return {
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.length,
    };
  }

  get center(): Point {
    return {
      x: this.displayTotalWidthMm / 2,
      y: this.displayTotalHeightMm / 2
    };
  }
}