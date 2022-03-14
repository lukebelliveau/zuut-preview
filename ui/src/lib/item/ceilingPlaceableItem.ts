import { Item } from '../item';
import PlaceableItem, { Layer } from './placeableItem';

export function isCeilingPlaceableItem(
  item: Item
): item is CeilingPlaceableItem {
  return item instanceof CeilingPlaceableItem;
}

export default class CeilingPlaceableItem extends PlaceableItem {
  layer = Layer.CEILING;
}
