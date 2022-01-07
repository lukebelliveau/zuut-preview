import React from 'react';
import { Line } from 'react-konva';

const WIDTH = 20;

export default class GridRenderer {
  xMax: number;
  yMax: number;

  constructor(xMax: number, yMax: number) {
    this.xMax = xMax;
    this.yMax = yMax;
  }

  render(): React.ReactNode[] {
    const lines: React.ReactNode[] = [];

    for (let x = WIDTH; x <= this.xMax; x = x + WIDTH) {
      lines.push(
        <Line
          points={[x, 0, x, this.yMax]}
          stroke="#f5faff"
          strokeWidth={1} />
      );
    }

    for (let y = WIDTH; y <= this.yMax; y = y + WIDTH) {
      lines.push(
        <Line
          points={[0, y, this.xMax, y]}
          stroke="#f5faff"
          strokeWidth={1} />
      );
    }

    return lines;
  }
}