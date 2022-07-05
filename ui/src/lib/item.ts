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
  amazonProducts: AmazonProduct[] | undefined;
}

export interface ItemArgs {
  name: string;
  id?: string;
  amazonProducts?: AmazonProduct[] | undefined;
}

export class Item implements IItem {
  id: string;
  type: string = 'Item';
  name: string;
  amazonProducts: AmazonProduct[] | undefined;

  constructor({ name, id = v4(), amazonProducts = undefined }: ItemArgs) {
    this.id = id;
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
