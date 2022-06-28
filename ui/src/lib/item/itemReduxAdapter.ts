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
import ExhaustFanItem, { EXHAUST_FAN_ITEM_TYPE } from './exhaustFanItem';
import OscillatingFanItem, {
  OSCILLATING_FAN_ITEM_TYPE,
} from './oscillatingFanItem';
import FloorACItem, { FLOOR_AC_ITEM_TYPE } from './floorACItem';
import HumidifierItem, { HUMIDIFIER_ITEM_TYPE } from './humidifierItem';
import DehumidifierItem, { DEHUMIDIFIER_ITEM_TYPE } from './dehumidifierItem';
import HeatItem, { HEAT_ITEM_TYPE } from './heatItem';
import PurifierItem, { PURIFIER_ITEM_TYPE } from './purifierItem';
import CurvedDuctItem, { CURVED_DUCT_ITEM_TYPE } from './curvedDuctItem';

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
      case EXHAUST_FAN_ITEM_TYPE:
        return new ExhaustFanItem(
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
      case OSCILLATING_FAN_ITEM_TYPE:
        return new OscillatingFanItem(
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
      case FLOOR_AC_ITEM_TYPE:
        return new FloorACItem(
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
      case HUMIDIFIER_ITEM_TYPE:
        return new HumidifierItem(
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
      case DEHUMIDIFIER_ITEM_TYPE:
        return new DehumidifierItem(
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
      case HEAT_ITEM_TYPE:
        return new HeatItem(
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
      case PURIFIER_ITEM_TYPE:
        return new PurifierItem(
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
      case CURVED_DUCT_ITEM_TYPE:
        return new CurvedDuctItem(
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
