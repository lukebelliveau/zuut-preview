import { v4 } from 'uuid';
import { Modifiers } from './item/placeableItem';

export interface AmazonProduct {
  recordId: string;
}

export interface IItem {
  id: string;
  type: string;
  name: string;
  copy(): Item;
  recordId?: string;
  amazonProducts: AmazonProduct[];
  selectedAmazonASIN: string;
  modifiers?: Modifiers;
}

export interface ItemArgs {
  name: string;
  amazonProducts: AmazonProduct[];
  selectedAmazonASIN: string;
  recordId?: string;
  id?: string;
}

export class Item implements IItem {
  id: string;
  recordId?: string;
  type: string = 'Item';
  name: string;
  amazonProducts: AmazonProduct[];
  selectedAmazonASIN: string;

  constructor({
    name,
    recordId = undefined,
    id = v4(),
    amazonProducts,
    selectedAmazonASIN,
  }: ItemArgs) {
    this.id = id;
    this.recordId = recordId;
    this.name = name;
    this.amazonProducts = amazonProducts;
    this.selectedAmazonASIN = selectedAmazonASIN;
  }

  copy(): Item {
    return new Item({
      name: this.name,
      id: this.id,
      amazonProducts: this.amazonProducts,
      selectedAmazonASIN: this.selectedAmazonASIN,
    });
  }
}
