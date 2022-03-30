import { Item } from '../item';
import PlaceableItem, { Layer } from './placeableItem';

export function isCeilingPlaceableItem(
  item: Item
): item is CeilingPlaceableItem {
  return item instanceof CeilingPlaceableItem;
}

export default class CeilingPlaceableItem extends PlaceableItem {
  layer = Layer.CEILING;

  opacity(currentlySelectedLayer: Layer): number {
    if (this.placementShadow) return 0.2;

    if (currentlySelectedLayer === Layer.FLOOR) return 0.2;

    return 1;
  }
}
