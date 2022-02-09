import { v4 } from 'uuid';

import PlaceableItem from './placeableItem';

export const ROOM_ITEM_TYPE = 'RoomItem';

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
    );
  }
}