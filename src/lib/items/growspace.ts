import { v4 } from 'uuid';
import GrowspaceItem from './growspaceItem';
import MiscItem from './miscItem';
import PlaceableItem from './placeableItem';

export default class Growspace extends PlaceableItem {
  type: string = 'Growspace';
  items: GrowspaceItem[];

  constructor(name: string, id: string = v4(), x: number = 0, y: number = 0, width: number = 610, length: number = 610, height: number = 915, items: GrowspaceItem[] = []) {
    super(name, id, x, y, width, length, height);
    this.items = items;
  }
}
