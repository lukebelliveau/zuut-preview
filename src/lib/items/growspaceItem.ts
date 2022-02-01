import { v4 } from 'uuid';
import Growspace from './growspace';
import PlaceableItem from './placeableItem';

export default class GrowspaceItem extends PlaceableItem {
  type: string = 'GrowspaceItem';
}
