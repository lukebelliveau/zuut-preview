import { Layer, Rect } from 'react-konva';

import Room from '../../lib/room';

type PlaygroundRoomProps = {
  room: Room;
}

export default function PlaygroundRoom({ room }: PlaygroundRoomProps) {
  return <Layer>
    <Rect
      x={room.x}
      y={room.y}
      width={room.width}
      height={room.length}
      stroke="black"
      strokeWidth={1}
      strokeScaleEnabled={false}
    />
  </Layer>;
}