import { v4 } from 'uuid';

import { Item, IItem, ItemArgs } from '../item';

export const MISC_ITEM_TYPE = 'MiscItem';

export function isMiscItem(item: Item): item is MiscItem {
  return (item as MiscItem).type === MISC_ITEM_TYPE;
}

export default class MiscItem implements IItem {
  id: string;
  type: string = MISC_ITEM_TYPE;
  name: string;
  ASIN: string | undefined;

  constructor({ name, id = v4(), ASIN = undefined }: ItemArgs) {
    this.id = id;
    this.name = name;
    this.ASIN = ASIN;
  }

  copy(): MiscItem {
    return new MiscItem({ name: this.name, id: v4(), ASIN: this.ASIN });
  }
}
