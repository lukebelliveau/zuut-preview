import React from 'react';
import { Rect } from 'react-konva';

import DisplaySpace from './displaySpace';
import Room from '../objects/room';

export const INSET_BUFFER = 50; // pixels

export default class RoomRenderer {
  displaySpace: DisplaySpace;
  room: Room;

  constructor(displaySpace: DisplaySpace, room: Room) {
    this.displaySpace = displaySpace;
    this.room = room;
  }

  render(): React.ReactNode {
    const placement = this.displaySpace.place(this.room);

    return <Rect
      x={placement.x}
      y={placement.y}
      width={placement.width}
      height={placement.height}
      stroke="black"
      strokeWidth={2}
    />;
  }
}