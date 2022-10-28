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
  amazonProducts: AmazonProduct[] | undefined;
  recordId?: string;

  constructor({ name, id = v4(), amazonProducts = undefined, recordId }: ItemArgs) {
    this.id = id;
    this.name = name;
    this.amazonProducts = amazonProducts;
    this.recordId = recordId;
  }

  copy(): ModifierItem {
    return new ModifierItem({
      name: this.name,
      id: v4(),
      amazonProducts: this.amazonProducts,
      recordId: this.recordId,
    });
  }
}
