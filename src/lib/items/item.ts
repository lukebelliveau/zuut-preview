import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';
import MiscItem from './miscItem';
import PlaceableItem from './placeableItem';
import RoomItem from './roomItem';

export type Item =
| Growspace
| GrowspaceItem
| MiscItem
| PlaceableItem
| RoomItem

export function isPlaceableItem(item: Item): item is PlaceableItem {
  return (item as PlaceableItem).x !== undefined;
}