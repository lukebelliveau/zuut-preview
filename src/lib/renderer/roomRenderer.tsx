import React from 'react';
import { Rect } from 'react-konva';

import DisplaySpace from './displaySpace';

export const INSET_BUFFER = 50; // pixels

export default class RoomRenderer {
  displaySpace: DisplaySpace;
  widthMm: number;
  lengthMm: number;
  heightMm: number;

  constructor(displaySpace: DisplaySpace, widthMm: number, lengthMm: number, heightMm: number) {
    this.displaySpace = displaySpace;
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

  render(): React.ReactNode {
    const placement = this.displaySpace.place(this);

    return <Rect
      x={placement.x}
      y={placement.y}
      width={placement.width}
      height={placement.height}
      fill="white"
      stroke="black"
      strokeWidth={2}
      shadowBlur={2}
    />;
  }
}