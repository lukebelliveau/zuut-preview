import { v4 } from 'uuid';
import { Item } from './item';

export default class MiscItem implements Item {
  id: string;
  name: string;

  constructor(name: string, id: string = v4()) {
    this.id = id;
    this.name = name;
  }
}