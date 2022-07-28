import { v4 } from 'uuid';

export interface AmazonProduct {
  ASIN: string;
  name: string;
}

export interface IItem {
  id: string;
  type: string;
  name: string;
  copy(): Item;
  recordId?: string;
  amazonProducts?: AmazonProduct[] | undefined;
}

export interface ItemArgs {
  name: string;
  recordId?: string;
  id?: string;
  amazonProducts?: AmazonProduct[] | undefined;
}

export class Item implements IItem {
  id: string;
  recordId?: string;
  type: string = 'Item';
  name: string;
  amazonProducts?: AmazonProduct[] | undefined;

  constructor({
    name,
    recordId = undefined,
    id = v4(),
    amazonProducts = undefined,
  }: ItemArgs) {
    this.id = id;
    this.recordId = recordId;
    this.name = name;
    this.amazonProducts = amazonProducts;
  }

  copy(): Item {
    return new Item({
      name: this.name,
      id: this.id,
      amazonProducts: this.amazonProducts,
    });
  }
}
