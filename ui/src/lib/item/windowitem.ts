import { v4 } from 'uuid';
import WallItem from './wallItem';

export const WINDOW_ITEM_TYPE = 'WindowItem';

export default class WindowItem extends WallItem {
  type: string = WINDOW_ITEM_TYPE;

  copy(): WindowItem {
    return new WindowItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height
    );
  }
}
