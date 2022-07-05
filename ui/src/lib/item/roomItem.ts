import { v4 } from 'uuid';

import { Item } from '../item';
import PlaceableItem from './placeableItem';

export const ROOM_ITEM_TYPE = 'RoomItem';

export function isRoomItem(item: Item): item is RoomItem {
  return (item as RoomItem).type === ROOM_ITEM_TYPE;
}

export default class RoomItem extends PlaceableItem {
  type: string = ROOM_ITEM_TYPE;

  copy(): RoomItem {
    return new RoomItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
    });
  }
}
