import { v4 } from 'uuid';

export interface IItem {
  id: string;
  type: string;
  name: string;
  copy(): Item;
  ASIN: string | null;
}

export class Item implements IItem {
  id: string;
  type: string = 'Item';
  name: string;
  ASIN: string | null;

  constructor(name: string, id: string = v4(), ASIN: string | null = null) {
    this.id = id;
    this.name = name;
    this.ASIN = ASIN ? ASIN : null;
  }

  copy(): Item {
    return new Item(this.name, this.id, this.ASIN);
  }
}
