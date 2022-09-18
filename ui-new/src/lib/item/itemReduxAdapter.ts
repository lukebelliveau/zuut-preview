import { ItemState } from '../../redux/features/items/itemState';
import Tent, { TENT_ITEM_TYPE } from './tentItem';
import GrowspaceItem, { GROWSPACE_ITEM_TYPE } from './growspaceItem';
import { IItem, Item } from '../item';
import MiscItem, { MISC_ITEM_TYPE } from './miscItem';
import RoomItem, { ROOM_ITEM_TYPE } from './roomItem';
import WallItem, { WALL_ITEM_TYPE } from './wallItem';
import { CollisionState, isPlaceableItem } from './placeableItem';
import WindowItem, { WINDOW_ITEM_TYPE } from './windowitem';
import PotItem, { POT_ITEM_TYPE } from './potItem';
import CeilingGrowspaceItem, { CEILING_GROWSPACE_ITEM_TYPE } from './ceilingGrowspaceItem';
import LightItem, { LIGHT_ITEM_TYPE } from './lightItem';
import DuctItem, { DUCT_ITEM_TYPE } from './ductItem';
import ModifierItem, { MODIFIER_ITEM_TYPE } from './modifierItem';
import CarbonFilterItem, { CARBON_FILTER_ITEM_TYPE } from './carbonFilterItem';
import DoorItem, { DOOR_ITEM_TYPE } from './doorItem';
import WaterItem, { WATER_ITEM_TYPE } from './waterItem';
import ExhaustFanItem, { EXHAUST_FAN_ITEM_TYPE } from './exhaustFanItem';
import OscillatingFanItem, { OSCILLATING_FAN_ITEM_TYPE } from './oscillatingFanItem';
import FloorACItem, { FLOOR_AC_ITEM_TYPE } from './floorACItem';
import HumidifierItem, { HUMIDIFIER_ITEM_TYPE } from './humidifierItem';
import DehumidifierItem, { DEHUMIDIFIER_ITEM_TYPE } from './dehumidifierItem';
import HeatItem, { HEAT_ITEM_TYPE } from './heatItem';
import PurifierItem, { PURIFIER_ITEM_TYPE } from './purifierItem';
import CurvedDuctItem, { CURVED_DUCT_ITEM_TYPE } from './curvedDuctItem';

export default class ItemReduxAdapter {
  public static itemStatesToItemList(itemStates: ItemState[]): IItem[] {
    const items: IItem[] = [];
    itemStates.forEach((itemState) => items.push(ItemReduxAdapter.stateToItem(itemState)));

    return items;
  }

  public static itemToState(item: Item): ItemState {
    const baseItemState = {
      id: item.id,
      type: item.type,
      name: item.name,
      collisionState: CollisionState.NEUTRAL,
      amazonProducts: item.amazonProducts,
      recordId: item.recordId,
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
        amazonProducts: item.amazonProducts,
      };
    } else {
      return baseItemState;
    }
  }

  public static stateToItem(itemState: ItemState): IItem {
    switch (itemState.type) {
      case TENT_ITEM_TYPE:
        return new Tent({
          name: itemState.name,
          id: itemState.id,
          amazonProducts: itemState.amazonProducts,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case GROWSPACE_ITEM_TYPE:
        return new GrowspaceItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case MISC_ITEM_TYPE:
        return new MiscItem({
          name: itemState.name,
          id: itemState.id,
          recordId: itemState.recordId,
        });
      case MODIFIER_ITEM_TYPE:
        return new ModifierItem({ name: itemState.name, id: itemState.id });
      case ROOM_ITEM_TYPE:
        return new RoomItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
        });

      case WALL_ITEM_TYPE:
        return new WallItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
        });
      case WINDOW_ITEM_TYPE:
        return new WindowItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
        });
      case DOOR_ITEM_TYPE:
        return new DoorItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
        });
      case POT_ITEM_TYPE:
        return new PotItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          amazonProducts: itemState.amazonProducts,
          recordId: itemState.recordId,
        });
      case CEILING_GROWSPACE_ITEM_TYPE:
        return new CeilingGrowspaceItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
        });
      case LIGHT_ITEM_TYPE:
        return new LightItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          amazonProducts: itemState.amazonProducts,
          recordId: itemState.recordId,
        });
      case EXHAUST_FAN_ITEM_TYPE:
        return new ExhaustFanItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          amazonProducts: itemState.amazonProducts,
          recordId: itemState.recordId,
        });
      case OSCILLATING_FAN_ITEM_TYPE:
        return new OscillatingFanItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case FLOOR_AC_ITEM_TYPE:
        return new FloorACItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case CARBON_FILTER_ITEM_TYPE:
        return new CarbonFilterItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case WATER_ITEM_TYPE:
        return new WaterItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case HUMIDIFIER_ITEM_TYPE:
        return new HumidifierItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case DEHUMIDIFIER_ITEM_TYPE:
        return new DehumidifierItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case HEAT_ITEM_TYPE:
        return new HeatItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case PURIFIER_ITEM_TYPE:
        return new PurifierItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case DUCT_ITEM_TYPE:
        return new DuctItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      case CURVED_DUCT_ITEM_TYPE:
        return new CurvedDuctItem({
          name: itemState.name,
          id: itemState.id,
          x: itemState.x,
          y: itemState.y,
          width: itemState.width,
          length: itemState.length,
          height: itemState.height,
          description: itemState.description,
          rotation: itemState.rotation,
          modifiers: itemState.modifiers,
          amazonProducts: itemState.amazonProducts,
          collisionState: itemState.collisionState,
          placementShadow: itemState.placementShadow,
          recordId: itemState.recordId,
        });
      default:
        throw new Error(`Unknown item type: ${itemState.type}`);
    }
  }
}
