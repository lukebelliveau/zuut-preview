import React from 'react';

import RoomRenderer from './renderer/roomRenderer';
import Playground from './playground';
import Plan from './plan';

const SCALE_MODIFIER = 80;

export default class Renderer {
  plan: Plan;
  playground: Playground;

  constructor(playground: Playground, plan: Plan) {
    this.playground = playground;
    this.plan = plan;
  }

  scale(): number {
    if (this.plan.room) {
      const widthScaleFactor = this.plan.room.width / (this.playground.displayWidth - SCALE_MODIFIER);
      const lengthScaleFactor = this.plan.room.length / (this.playground.displayHeight - SCALE_MODIFIER);
      return 1 / Math.max(widthScaleFactor, lengthScaleFactor);
    } else {
      return 1;
    }
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
