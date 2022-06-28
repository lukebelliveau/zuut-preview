import { IItem, Item } from '../item';
import { Item as GraphqlItem } from '../../graphql';
import { unwrapOrError, unwrapOrUndefined } from '../graphqlData';
import Growspace, { GROWSPACE_TYPE } from './growspace';
import GrowspaceItem, { GROWSPACE_ITEM_TYPE } from './growspaceItem';
import MiscItem, { MISC_ITEM_TYPE } from './miscItem';
import RoomItem, { ROOM_ITEM_TYPE } from './roomItem';
import WallItem, { WALL_ITEM_TYPE } from './wallItem';
import PotItem, { POT_ITEM_TYPE } from './potItem';
import CeilingGrowspaceItem, {
  CEILING_GROWSPACE_ITEM_TYPE,
} from './ceilingGrowspaceItem';
import LightItem, { LIGHT_ITEM_TYPE } from './lightItem';
import { isPlaceableItem, Modifiers } from './placeableItem';
import DuctItem, { DUCT_ITEM_TYPE } from './ductItem';
import CurvedDuctItem, { CURVED_DUCT_ITEM_TYPE } from './curvedDuctItem';
import WindowItem, { WINDOW_ITEM_TYPE } from './windowitem';
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

export default class ItemGraphqlAdapter {
  public static itemToGraphql(item: IItem): GraphqlItem {
    if (isPlaceableItem(item)) {
      return {
        id: item.id,
        type: item.type,
        name: item.name,
        x: item.x,
        y: item.y,
        width: item.width,
        length: item.length,
        height: item.height,
        rotation: item.rotation,
        modifiers: item.modifiers,
        description: item.description,
      };
    } else {
      return {
        id: item.id,
        type: item.type,
        name: item.name,
      };
    }
  }

  public static graphqlToItem(gqlItem: GraphqlItem): Item {
    const itemAttrs: [
      string,
      string,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      string | undefined,
      number | undefined,
      Modifiers | undefined
    ] = [
      gqlItem.name,
      gqlItem.id,
      unwrapOrUndefined(gqlItem.x),
      unwrapOrUndefined(gqlItem.y),
      unwrapOrUndefined(gqlItem.width),
      unwrapOrUndefined(gqlItem.length),
      unwrapOrUndefined(gqlItem.height),
      unwrapOrUndefined(gqlItem.description),
      unwrapOrUndefined(gqlItem.rotation),
      unwrapOrUndefined(gqlItem.modifiers),
    ];

    switch (unwrapOrError(gqlItem.type)) {
      case CEILING_GROWSPACE_ITEM_TYPE:
        return new CeilingGrowspaceItem(...itemAttrs);
      case GROWSPACE_TYPE:
        return new Growspace(...itemAttrs);
      case GROWSPACE_ITEM_TYPE:
        return new GrowspaceItem(...itemAttrs);
      case LIGHT_ITEM_TYPE:
        return new LightItem(...itemAttrs);
      case CARBON_FILTER_ITEM_TYPE:
        return new CarbonFilterItem(...itemAttrs);
      case EXHAUST_FAN_ITEM_TYPE:
        return new ExhaustFanItem(...itemAttrs);
      case OSCILLATING_FAN_ITEM_TYPE:
        return new OscillatingFanItem(...itemAttrs);
      case FLOOR_AC_ITEM_TYPE:
        return new FloorACItem(...itemAttrs);
      case WATER_ITEM_TYPE:
        return new WaterItem(...itemAttrs);
      case HUMIDIFIER_ITEM_TYPE:
        return new HumidifierItem(...itemAttrs);
      case DEHUMIDIFIER_ITEM_TYPE:
        return new DehumidifierItem(...itemAttrs);
      case HEAT_ITEM_TYPE:
        return new HeatItem(...itemAttrs);
      case PURIFIER_ITEM_TYPE:
        return new PurifierItem(...itemAttrs);
      case MISC_ITEM_TYPE:
        return new MiscItem(gqlItem.name, gqlItem.id);
      case MODIFIER_ITEM_TYPE:
        return new ModifierItem(gqlItem.name, gqlItem.id);
      case POT_ITEM_TYPE:
        return new PotItem(...itemAttrs);
      case ROOM_ITEM_TYPE:
        return new RoomItem(...itemAttrs);
      case WALL_ITEM_TYPE:
        return new WallItem(...itemAttrs);
      case WINDOW_ITEM_TYPE:
        return new WindowItem(...itemAttrs);
      case DOOR_ITEM_TYPE:
        return new DoorItem(...itemAttrs);
      case DUCT_ITEM_TYPE:
        return new DuctItem(...itemAttrs);
      case CURVED_DUCT_ITEM_TYPE:
        return new CurvedDuctItem(...itemAttrs);
      default:
        throw new Error(`Unknown item type: ${gqlItem.type}`);
    }
  }
}
