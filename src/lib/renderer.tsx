import React from 'react';
import Plan from './plan';
import DisplaySpace from './renderer/displaySpace';
import RoomRenderer from './renderer/roomRenderer';

export default class Renderer {
  room: RoomRenderer;
  displaySpace: DisplaySpace;

  public static fromPlan(displayWidth: number, displayHeight: number, plan: Plan): Renderer {
    const displaySpace = new DisplaySpace(displayWidth, displayHeight, plan.width, plan.length);
    const roomRenderer = new RoomRenderer(
      displaySpace,
      plan.width,
      plan.length,
      plan.height,
    );
    return new Renderer(displaySpace, roomRenderer);
  }

  constructor(displaySpace: DisplaySpace, room: RoomRenderer) {
    this.displaySpace = displaySpace;
    this.room = room;
  }

  get width(): number {
    return this.displaySpace.xMax;
  }

  get height(): number {
    return this.displaySpace.yMax;
  }

  render(): React.ReactNode {
    return this.room.render();
  }
}
