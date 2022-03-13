import { IItem, Item } from '../item';
import { Item as GraphqlItem } from '../../graphql';
import { unwrapOrError, unwrapOrUndefined } from '../graphqlData';
import Growspace, { GROWSPACE_TYPE } from './growspace';
import GrowspaceItem, { GROWSPACE_ITEM_TYPE } from './growspaceItem';
import MiscItem, { MISC_ITEM_TYPE } from './miscItem';
import RoomItem, { ROOM_ITEM_TYPE } from './roomItem';
import WallItem, { WALL_ITEM_TYPE } from './wallItem';
import PotItem, { POT_ITEM_TYPE } from './potItem';
import CeilingGrowspaceItem, { CEILING_GROWSPACE_ITEM_TYPE } from './ceilingGrowspaceItem';
import LightItem, { LIGHT_ITEM_TYPE } from './lightItem';
import { isPlaceableItem } from './placeableItem';

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
    const itemAttrs: [string, string, number | undefined, number | undefined, number | undefined, number | undefined, number | undefined] = [
      gqlItem.name,
      gqlItem.id,
      unwrapOrUndefined(gqlItem.x),
      unwrapOrUndefined(gqlItem.y),
      unwrapOrUndefined(gqlItem.width),
      unwrapOrUndefined(gqlItem.length),
      unwrapOrUndefined(gqlItem.height),
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
      case MISC_ITEM_TYPE:
        return new MiscItem(gqlItem.name, gqlItem.id);
      case POT_ITEM_TYPE:
        return new PotItem(...itemAttrs);
      case ROOM_ITEM_TYPE:
        return new RoomItem(...itemAttrs);
      case WALL_ITEM_TYPE:
        return new WallItem(...itemAttrs);
      default:
        throw new Error(`Unknown item type: ${gqlItem.type}`);
    }
  }
}