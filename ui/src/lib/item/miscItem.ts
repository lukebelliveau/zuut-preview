import { v4 } from 'uuid';

import { Item, IItem, ItemArgs, AmazonProduct } from '../item';

export const MISC_ITEM_TYPE = 'MiscItem';

export function isMiscItem(item: Item): item is MiscItem {
  return (item as MiscItem).type === MISC_ITEM_TYPE;
}

export default class MiscItem implements IItem {
  id: string;
  type: string = MISC_ITEM_TYPE;
  name: string;
  amazonProducts: AmazonProduct[] | undefined;
  recordId?: string;

  constructor({
    name,
    id = v4(),
    amazonProducts = undefined,
    recordId,
  }: ItemArgs) {
    this.id = id;
    this.name = name;
    this.amazonProducts = amazonProducts;
    this.recordId = recordId;
  }

  copy(): MiscItem {
    return new MiscItem({
      name: this.name,
      id: v4(),
      amazonProducts: this.amazonProducts,
      recordId: this.recordId,
    });
  }
}
