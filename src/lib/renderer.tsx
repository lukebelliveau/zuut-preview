import React from 'react';

import Plan from './plan';
import Room from './objects/room';
import RoomRenderer from './renderer/roomRenderer';
import { Point } from './point';
import Playground from './playground';

export default class Renderer {
  room: RoomRenderer;
  playground: Playground;

  public static fromPlan(displayWidth: number, displayHeight: number, plan: Plan): Renderer {
    const playground = new Playground(displayWidth, displayHeight, plan.id);
    const room = new Room(plan.width, plan.length, plan.height);
    const roomRenderer = new RoomRenderer(room);
    return new Renderer(playground, roomRenderer);
  }

  constructor(playground: Playground, room: RoomRenderer) {
    this.playground = playground;
    this.room = room;
  }

  get center(): Point {
    return this.playground.center;
  }

  render(): React.ReactNode {
    return this.room.render();
  }
}
