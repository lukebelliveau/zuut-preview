import { isPlaceableItem } from './item';
import PlaceableItem, { IPlaceableItem } from './item/placeableItem';

export default class ItemList extends Array {
  placeable(): IPlaceableItem[] {
    return this.filter((item) => isPlaceableItem(item));
  }
}
