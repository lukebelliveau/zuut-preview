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
  linkedASINs: string[];
}

export interface ItemArgs {
  name: string;
  amazonProducts: AmazonProduct[];
  linkedASINs: string[];
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
  linkedASINs: string[];

  constructor({
    name,
    recordId = undefined,
    id = v4(),
    amazonProducts,
    selectedAmazonASIN,
    linkedASINs,
  }: ItemArgs) {
    this.id = id;
    this.recordId = recordId;
    this.name = name;
    this.amazonProducts = amazonProducts;
    this.selectedAmazonASIN = selectedAmazonASIN;
    this.linkedASINs = linkedASINs;
  }

  copy(): Item {
    return new Item({
      name: this.name,
      id: this.id,
      amazonProducts: this.amazonProducts,
      selectedAmazonASIN: this.selectedAmazonASIN,
      linkedASINs: this.linkedASINs,
    });
  }
}
