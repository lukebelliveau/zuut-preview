import { v4 } from 'uuid';

export interface IItem {
  id: string;
  type: string;
  name: string;
  copy(): Item;
  ASIN: string | undefined;
}

export interface ItemArgs {
  name: string;
  id?: string;
  ASIN?: string;
}

export class Item implements IItem {
  id: string;
  type: string = 'Item';
  name: string;
  ASIN: string | undefined;

  constructor({ name, id = v4(), ASIN = undefined }: ItemArgs) {
    this.id = id;
    this.name = name;
    this.ASIN = ASIN;
  }

  copy(): Item {
    return new Item({ name: this.name, id: this.id, ASIN: this.ASIN });
  }
}
