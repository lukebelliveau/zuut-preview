import { ItemState } from '../../features/playgrounds/playgroundState';
import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';
import PlaceableItem from './placeableItem';
import RoomItem from './roomItem';

export default class ItemReduxAdapter {
  public static itemToState(item: PlaceableItem): ItemState {
    return {
      type: item.type,
      name: item.name,
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height,
      length: item.length,
    };
  }

  public static stateToItem(itemState: ItemState) {
    const positionedParams = [itemState.x, itemState.y, itemState.width, itemState.length, itemState.height];

    switch(itemState.type) {
      case 'Growspace':
        return new Growspace(itemState.name, undefined, ...positionedParams);
      case 'GrowspaceItem':
        return new GrowspaceItem(itemState.name, undefined, ...positionedParams);
      case 'RoomItem':
        return new RoomItem(itemState.name, undefined, ...positionedParams);
      default:
        throw new Error(`Unknown item type: ${itemState.type}`);
    }
  }
}