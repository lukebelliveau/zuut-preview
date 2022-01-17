import Room from './objects/room';
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

  center(room: Room): Point {
    return {
      x: room.width / 2,
      y: room.height / 2
    };
  }
}