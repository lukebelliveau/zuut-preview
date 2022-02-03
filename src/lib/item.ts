import Growspace, { GROWSPACE_TYPE } from './item/growspace';
import GrowspaceItem, { GROWSPACE_ITEM_TYPE } from './item/growspaceItem';
import MiscItem from './item/miscItem';
import PlaceableItem from './item/placeableItem';
import RoomItem from './item/roomItem';

export type Item =
| Growspace
| GrowspaceItem
| MiscItem
| PlaceableItem
| RoomItem

export function isPlaceableItem(item: Item): item is PlaceableItem {
  return (item as PlaceableItem).x !== undefined;
}
export function isGrowspace(item: Item): item is Growspace {
  return (item as Growspace).type === GROWSPACE_TYPE;
}
export function isGrowspaceItem(item: Item): item is GrowspaceItem {
  return (item as GrowspaceItem).type === GROWSPACE_ITEM_TYPE;
}