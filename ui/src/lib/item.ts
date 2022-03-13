import { v4 } from 'uuid';

export interface IItem {
  id: string;
  type: string;
  name: string;
  copy(): Item;
}

export class Item implements IItem {
  id: string;
  type: string = 'Item';
  name: string;

  constructor(
    name: string,
    id: string = v4(),
  ) {
    this.id = id;
    this.name = name;
  }

  copy(): Item {
    return new Item(this.name);
  }
}