import React from 'react';

import RoomRenderer from './renderer/roomRenderer';
import Playground from './playground';

export default class Renderer {
  playground: Playground;

  constructor(playground: Playground) {
    this.playground = playground;
  }

  render(): React.ReactNode {
    if (this.playground.plan?.room) {
      const roomRenderer = new RoomRenderer(this.playground.plan.room);
      return roomRenderer.render();
    } else {
      return <></>;
    }
  }
}
