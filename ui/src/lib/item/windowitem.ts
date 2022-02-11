import WallItem from './wallItem';

export const WINDOW_ITEM_TYPE = 'WindowItem';

export default class WindowItem extends WallItem {
  type: string = WINDOW_ITEM_TYPE;
}
