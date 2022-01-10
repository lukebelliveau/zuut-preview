import React from 'react';
import { Rect } from 'react-konva';

import Room from '../objects/room';

export default class RoomRenderer {
  room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  render(): React.ReactNode {
    return <Rect
      x={this.room.x}
      y={this.room.y}
      width={this.room.width}
      height={this.room.length}
      stroke="black"
      strokeWidth={2}
    />;
  }
}