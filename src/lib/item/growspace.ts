import { v4 } from 'uuid';
import { isGrowspaceItem } from '../item';
import PlaceableItem from './placeableItem';

export const GROWSPACE_TYPE = 'Growspace';

export default class Growspace extends PlaceableItem {
  type: string = GROWSPACE_TYPE;

  copy(): Growspace {
    return new Growspace(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height,
    );
  }

  isCollidingWith(otherItem: PlaceableItem): boolean {
    if (isGrowspaceItem(otherItem)) return false;
    
    return super.isCollidingWith(otherItem);
  }
}
