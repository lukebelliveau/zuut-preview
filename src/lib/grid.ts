const SNAP_INTERVAL = 304.8; // 12in

export default class Grid {
  width: number;
  length: number;

  constructor(width: number = 0, length: number = 0) {
    this.width = width;
    this.length = length;
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