import Growspace from './item/growspace';
import GrowspaceItem from './item/growspaceItem';
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