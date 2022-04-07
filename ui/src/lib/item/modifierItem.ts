import { v4 } from 'uuid';
import { Item } from '../item';

export const MODIFIER_ITEM_TYPE = 'ModifierItem';

export function isModiferItem(item: Item): item is ModifierItem {
  return (item as ModifierItem).type === MODIFIER_ITEM_TYPE;
}

export default class ModifierItem {
  id: string;
  type: string = MODIFIER_ITEM_TYPE;
  name: string;

  constructor(name: string, id: string = v4()) {
    this.id = id;
    this.name = name;
  }

  copy(): ModifierItem {
    return new ModifierItem(this.name, v4());
  }
}
