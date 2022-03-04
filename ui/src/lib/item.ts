import Growspace, { GROWSPACE_TYPE } from './item/growspace';
import GrowspaceItem from './item/growspaceItem';
import MiscItem, { MISC_ITEM_TYPE } from './item/miscItem';
import PlaceableItem from './item/placeableItem';
import PotItem, { POT_ITEM_TYPE } from './item/potItem';
import RoomItem, { ROOM_ITEM_TYPE } from './item/roomItem';
import WallItem, { WALL_ITEM_TYPE } from './item/wallItem';

// TODO: eventually this can replace our union type below?
export interface IItem {
  id: string;
  type: string;
  name: string;
  x?: number;
  y?: number;
  width?: number;
  length?: number;
  height?: number;
}

export type Item =
  | Growspace
  | GrowspaceItem
  | MiscItem
  | PlaceableItem
  | RoomItem;

export function isPlaceableItem(item: Item): item is PlaceableItem {
  return (item as PlaceableItem).x !== undefined;
}
export function isGrowspace(item: Item): item is Growspace {
  return (item as Growspace).type === GROWSPACE_TYPE;
}
export function isGrowspaceItem(item: Item): item is GrowspaceItem {
  // returns true if GrowspaceItem *or* subclass of GrowspaceItem
  return item instanceof GrowspaceItem;
}

export function isMiscItem(item: Item): item is MiscItem {
  return (item as MiscItem).type === MISC_ITEM_TYPE;
}

export function isRoomItem(item: Item): item is RoomItem {
  return (item as RoomItem).type === ROOM_ITEM_TYPE;
}

export function isWallItem(item: Item): item is WallItem {
  return (item as WallItem).type === WALL_ITEM_TYPE;
}

export function isPotItem(item: Item): item is PotItem {
  return (item as PotItem).type === POT_ITEM_TYPE;
}