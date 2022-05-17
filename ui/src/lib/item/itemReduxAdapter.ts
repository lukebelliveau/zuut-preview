import { ItemState } from '../../features/items/itemState';
import Growspace, { GROWSPACE_TYPE } from './growspace';
import GrowspaceItem, { GROWSPACE_ITEM_TYPE } from './growspaceItem';
import { IItem, Item } from '../item';
import MiscItem, { MISC_ITEM_TYPE } from './miscItem';
import RoomItem, { ROOM_ITEM_TYPE } from './roomItem';
import WallItem, { WALL_ITEM_TYPE } from './wallItem';
import { CollisionState, isPlaceableItem } from './placeableItem';
import WindowItem, { WINDOW_ITEM_TYPE } from './windowitem';
import PotItem, { POT_ITEM_TYPE } from './potItem';
import CeilingGrowspaceItem, {
  CEILING_GROWSPACE_ITEM_TYPE,
} from './ceilingGrowspaceItem';
import LightItem, { LIGHT_ITEM_TYPE } from './lightItem';
import DuctItem, { DUCT_ITEM_TYPE } from './ductItem';
import ModifierItem, { MODIFIER_ITEM_TYPE } from './modifierItem';
import CarbonFilterItem, { CARBON_FILTER_ITEM_TYPE } from './carbonFilterItem';
import DoorItem, { DOOR_ITEM_TYPE } from './doorItem';
import WaterItem, { WATER_ITEM_TYPE } from './waterItem';

export default class ItemReduxAdapter {
  public static itemStatesToItemList(itemStates: ItemState[]): IItem[] {
    const items: IItem[] = [];
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
      collisionState: CollisionState.NEUTRAL,
    };

    if (isPlaceableItem(item)) {
      return {
        ...baseItemState,
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
        length: item.length,
        collisionState: item.collisionState,
        placementShadow: item.placementShadow,
        rotation: item.rotation,
        modifiers: item.modifiers,
        description: item.description,
      };
    } else {
      return baseItemState;
    }
  }

  public static stateToItem(itemState: ItemState): IItem {
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
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
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
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case MISC_ITEM_TYPE:
        return new MiscItem(itemState.name, itemState.id);
      case MODIFIER_ITEM_TYPE:
        return new ModifierItem(itemState.name, itemState.id);
      case ROOM_ITEM_TYPE:
        return new RoomItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
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
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case WINDOW_ITEM_TYPE:
        return new WindowItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case DOOR_ITEM_TYPE:
        return new DoorItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case POT_ITEM_TYPE:
        return new PotItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case CEILING_GROWSPACE_ITEM_TYPE:
        return new CeilingGrowspaceItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case LIGHT_ITEM_TYPE:
        return new LightItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case CARBON_FILTER_ITEM_TYPE:
        return new CarbonFilterItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case WATER_ITEM_TYPE:
        return new WaterItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      case DUCT_ITEM_TYPE:
        return new DuctItem(
          itemState.name,
          itemState.id,
          itemState.x,
          itemState.y,
          itemState.width,
          itemState.length,
          itemState.height,
          itemState.description,
          itemState.rotation,
          itemState.modifiers,
          itemState.collisionState,
          itemState.placementShadow
        );
      default:
        throw new Error(`Unknown item type: ${itemState.type}`);
    }
  }
}
