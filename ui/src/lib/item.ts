import Growspace, { GROWSPACE_TYPE } from './item/growspace';
import GrowspaceItem, { GROWSPACE_ITEM_TYPE } from './item/growspaceItem';
import MiscItem from './item/miscItem';
import PlaceableItem from './item/placeableItem';
import RoomItem from './item/roomItem';

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
