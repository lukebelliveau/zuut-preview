import { v4 } from 'uuid';
import { Item, ItemArgs } from '../item';

export const MODIFIER_ITEM_TYPE = 'ModifierItem';

export function isModiferItem(item: Item): item is ModifierItem {
  return (item as ModifierItem).type === MODIFIER_ITEM_TYPE;
}

export default class ModifierItem {
  id: string;
  type: string = MODIFIER_ITEM_TYPE;
  name: string;
  ASIN: string | undefined;

  constructor({ name, id = v4(), ASIN = undefined }: ItemArgs) {
    this.id = id;
    this.name = name;
    this.ASIN = ASIN;
  }

  copy(): ModifierItem {
    return new ModifierItem({ name: this.name, id: v4(), ASIN: this.ASIN });
  }
}
