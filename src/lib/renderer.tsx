import React from 'react';

import RoomRenderer from './renderer/roomRenderer';
import { Point } from './point';
import Playground from './playground';
import Plan from './plan';

export default class Renderer {
  plan: Plan;
  playground: Playground;

  constructor(playground: Playground, plan: Plan) {
    this.playground = playground;
    this.plan = plan;
  }

  get center(): Point {
    return this.playground.center;
  }

  render(): React.ReactNode {
    if (this.plan.room) {
      const roomRenderer = new RoomRenderer(this.plan.room);
      return roomRenderer.render();
    } else {
      return <></>;
    }
  }
}
