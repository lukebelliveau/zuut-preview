import { Point } from './point';

export default class Playground {
  displayWidth: number;
  displayHeight: number;
  planId: string | undefined;

  constructor(displayWidth: number, displayHeight: number, planId: string | undefined) {
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
    this.planId = planId;
  }

  get center(): Point {
    return {
      x: this.displayWidth / 2,
      y: this.displayHeight / 2
    };
  }
  
  get scale(): number {
    return 1 / (4572.0 / 1198.0); // 15ft per macbook fullscreen width
  }
}