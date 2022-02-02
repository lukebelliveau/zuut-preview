import { isPlaceableItem } from './items/item';
import PlaceableItem from './items/placeableItem';

export default class ItemList extends Array {
  placeable(): PlaceableItem[] {
    return this.filter(item => isPlaceableItem(item));
  }
}