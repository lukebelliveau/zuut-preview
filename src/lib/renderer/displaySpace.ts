import { Placement } from './placement';
import RoomRenderer from './roomRenderer';

const INSET_WIDTH = 5;

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

  place(item: RoomRenderer): Placement {
    return {
      x: this.mmToPixels(item.xOffsetMm) + INSET_WIDTH,
      y: this.mmToPixels(item.yOffsetMm) + INSET_WIDTH,
      width: this.mmToPixels(item.widthMm),
      height: this.mmToPixels(item.lengthMm),
    };
  }

  private mmToPixels(mm: number): number {
    const ratio = (this.xMax - 2 * INSET_WIDTH) / this.xMax;
    return Math.trunc(ratio * mm);
  }
}