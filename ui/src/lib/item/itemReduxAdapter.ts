import { ItemState } from '../../features/items/itemState';
import ItemList from '../itemList';
import Growspace, { GROWSPACE_TYPE } from './growspace';
import GrowspaceItem, { GROWSPACE_ITEM_TYPE } from './growspaceItem';
import { isPlaceableItem, Item } from '../item';
import MiscItem, { MISC_ITEM_TYPE } from './miscItem';
import RoomItem, { ROOM_ITEM_TYPE } from './roomItem';
import WallItem, { WALL_ITEM_TYPE } from './wallItem';

export default class ItemReduxAdapter {
  public static itemStatesToItemList(itemStates: ItemState[]): ItemList {
    const items = new ItemList();
    itemStates.forEach((itemState) =>
      items.push(ItemReduxAdapter.stateToItem(itemState))
    );

    return items;
  }

  public static itemToState(item: Item): ItemState {
    const baseItemState = {
      id: item.id,
      type: item.type,
      name: item.name,
      isColliding: false,
    };

    if (isPlaceableItem(item)) {
      return {
        ...baseItemState,
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
        length: item.length,
        isColliding: item.isColliding,
        placementShadow: item.placementShadow,
      };
    } else {
      return baseItemState;
    }
  }

  public static stateToItem(itemState: ItemState) {
    switch (itemState.type) {
      case GROWSPACE_TYPE:
        return new Growspace(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.isColliding,
          itemState.placementShadow
        );
      case GROWSPACE_ITEM_TYPE:
        return new GrowspaceItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.isColliding,
          itemState.placementShadow
        );
      case MISC_ITEM_TYPE:
        return new MiscItem(itemState.name, itemState.id);
      case ROOM_ITEM_TYPE:
        return new RoomItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.isColliding,
          itemState.placementShadow
        );

      case WALL_ITEM_TYPE:
        return new WallItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.isColliding,
          itemState.placementShadow
        );
      default:
        throw new Error(`Unknown item type: ${itemState.type}`);
    }
  }
}
