import { feetToMm } from './conversions';
import { Point } from './point';

export const shouldNormalizeTo3Inches = true;

export default class Grid {
  width: number;
  length: number;
  snapInterval: number;

  constructor(
    width: number,
    length: number,
    snapInterval: number = feetToMm(0.25)
  ) {
    this.width = width;
    this.length = length;
    this.snapInterval = snapInterval;
  }

  snapPosition(position: Point): Point {
    return {
      x: Math.round(position.x / this.snapInterval) * this.snapInterval,
      y: Math.round(position.y / this.snapInterval) * this.snapInterval,
    };
  }

  /**
   *
   * @param position the (x,y) of a point (usually the center of a PlaceableItem/shadow)
   * @param offset the offset of this point - (position.x - offset.x) should get NorthWest corner
   * @param isRotated whether the item is rotated, must flip offset axes if so
   * @returns position of (x,y) such that (position.{x,y} - offset{x,y}) is snapped to the grid
   *
   * This is meant to replace the snapPosition method, which was used to snap an item's (x,y) coordinates
   * to a place on the grid, based on the snapInterval.
   *
   * This stopped working once we started placing our items with (x,y) AND an offset.
   * We want the top-left corner of items to snap to the grid, so we need to factor in the offset
   * when we calculate an (x,y).
   */
  snapOffsetPosition(
    position: Point,
    offset: Point,
    isRotated: boolean
  ): Point {
    if (isRotated) {
      return {
        x:
          Math.round((position.x - offset.y) / this.snapInterval) *
            this.snapInterval +
          offset.y,
        y:
          Math.round((position.y - offset.x) / this.snapInterval) *
            this.snapInterval +
          offset.x,
      };
    }
    return {
      x:
        Math.round((position.x - offset.x) / this.snapInterval) *
          this.snapInterval +
        offset.x,
      y:
        Math.round((position.y - offset.y) / this.snapInterval) *
          this.snapInterval +
        offset.y,
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
