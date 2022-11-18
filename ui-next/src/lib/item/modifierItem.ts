import { v4 } from 'uuid';
import { AmazonProduct, Item, ItemArgs } from '../item';

export const MODIFIER_ITEM_TYPE = 'ModifierItem';

export function isModifierItem(item: Item): item is ModifierItem {
  return (item as ModifierItem).type === MODIFIER_ITEM_TYPE;
}

export default class ModifierItem {
  id: string;
  type: string = MODIFIER_ITEM_TYPE;
  name: string;
  amazonProducts: AmazonProduct[];
  selectedAmazonASIN: string;
  linkedASINs: string[];
  recordId?: string;

  constructor({
    name,
    id = v4(),
    amazonProducts,
    recordId,
    selectedAmazonASIN,
    linkedASINs,
  }: ItemArgs) {
    this.id = id;
    this.name = name;
    this.amazonProducts = amazonProducts;
    this.selectedAmazonASIN = selectedAmazonASIN;
    this.recordId = recordId;
    this.linkedASINs = linkedASINs;
  }

  copy(): ModifierItem {
    return new ModifierItem({
      name: this.name,
      id: v4(),
      recordId: this.recordId,
      amazonProducts: this.amazonProducts,
      selectedAmazonASIN: this.selectedAmazonASIN,
      linkedASINs: this.linkedASINs,
    });
  }
}
