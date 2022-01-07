import React from 'react';
import DisplaySpace from './renderer/displaySpace';
import Plan from './plan';
import Room from './objects/room';
import RoomRenderer from './renderer/roomRenderer';

export default class Renderer {
  room: RoomRenderer;
  displaySpace: DisplaySpace;

  public static fromPlan(displayWidth: number, displayHeight: number, plan: Plan): Renderer {
    const displaySpace = new DisplaySpace(displayWidth, displayHeight, plan.width, plan.length);
    const room = new Room(plan.width, plan.length, plan.height);
    const roomRenderer = new RoomRenderer(
      displaySpace,
      room
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
