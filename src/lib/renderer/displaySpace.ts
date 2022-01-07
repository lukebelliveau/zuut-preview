import { Placement } from './placement';
import Room from '../objects/room';

const INSET_WIDTH = 20;

export default class DisplaySpace {
  xMax: number;
  yMax: number;
  displayTotalWidthMm: number;
  displayTotalHeightMm: number;

  constructor(xMax: number, yMax: number, displayTotalWidthMm: number, displayTotalHeightMm: number) {
    this.xMax = xMax;
    this.yMax = yMax;
    this.displayTotalWidthMm = displayTotalWidthMm;
    this.displayTotalHeightMm = displayTotalHeightMm;
  }

  place(item: Room): Placement {
    return {
      x: INSET_WIDTH,
      y: INSET_WIDTH,
      width: this.mmToPixels(item.widthMm),
      height: this.mmToPixels(item.lengthMm),
    };
  }

  private mmToPixels(mm: number): number {
    return this.xMax - 2 * INSET_WIDTH;
  }
}