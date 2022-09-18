import { Item } from '../item';
import { Layer } from '../layer';
import PlaceableItem from './placeableItem';

export function isCeilingPlaceableItem(
  item: Item
): item is CeilingPlaceableItem {
  return item instanceof CeilingPlaceableItem;
}

export default class CeilingPlaceableItem extends PlaceableItem {
  layer = Layer.CEILING;
}
