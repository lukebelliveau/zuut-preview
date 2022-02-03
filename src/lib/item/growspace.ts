import { v4 } from 'uuid';
import GrowspaceItem from './growspaceItem';
import PlaceableItem from './placeableItem';

export const GROWSPACE_TYPE = 'Growspace';

export default class Growspace extends PlaceableItem {
  type: string = GROWSPACE_TYPE;
  items: GrowspaceItem[];

  constructor(name: string, id: string = v4(), x: number = 0, y: number = 0, width: number = 610, length: number = 610, height: number = 915, items: GrowspaceItem[] = []) {
    super(name, id, x, y, width, length, height);
    this.items = items;
  }

  copy(): Growspace {
    return new Growspace(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height,
      this.items
    );
  }
}
