import React from 'react';

import RoomRenderer from './renderer/roomRenderer';
import Playground from './playground';
import Plan from './plan';
import Zoom from './zoom';

export default class Renderer {
  plan: Plan;
  playground: Playground;
  zoom: Zoom;

  constructor(playground: Playground, plan: Plan) {
    this.playground = playground;
    this.plan = plan;
    this.zoom = new Zoom(playground, plan);
  }

  scale(): number {
    return this.zoom.scale();
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
