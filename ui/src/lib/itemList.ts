import { isPlaceableItem } from './item';
import PlaceableItem from './item/placeableItem';

export default class ItemList extends Array {
  placeable(): PlaceableItem[] {
    return this.filter(item => isPlaceableItem(item));
  }
}