import { v4 } from 'uuid';

import { Item, IItem } from '../item';

export const MISC_ITEM_TYPE = 'MiscItem';

export function isMiscItem(item: Item): item is MiscItem {
  return (item as MiscItem).type === MISC_ITEM_TYPE;
}

export default class MiscItem implements IItem {
  id: string;
  type: string = MISC_ITEM_TYPE;
  name: string;
  ASIN: string | null;

  constructor(name: string, id: string = v4(), ASIN: string | null = null) {
    this.id = id;
    this.name = name;
    this.ASIN = ASIN;
  }

  copy(): MiscItem {
    return new MiscItem(this.name, v4(), this.ASIN);
  }
}
