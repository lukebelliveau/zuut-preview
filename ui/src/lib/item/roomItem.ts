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
    return new RoomItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height,
      this.description
    );
  }
}
