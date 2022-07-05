import { v4 } from 'uuid';
import { AmazonProduct } from '../../graphql';

import { Item, IItem, ItemArgs } from '../item';

export const MISC_ITEM_TYPE = 'MiscItem';

export function isMiscItem(item: Item): item is MiscItem {
  return (item as MiscItem).type === MISC_ITEM_TYPE;
}

export default class MiscItem implements IItem {
  id: string;
  type: string = MISC_ITEM_TYPE;
  name: string;
  amazonProducts: AmazonProduct[] | undefined;

  constructor({
    name,
    id = v4(),
    amazonProducts = [
      {
        ASIN: 'B08SBN1YJD',
        name: 'Sample Misc Item',
      },
    ],
  }: ItemArgs) {
    console.log('CONSTRUCTOR');
    console.log(amazonProducts);
    this.id = id;
    this.name = name;
    this.amazonProducts = amazonProducts;
  }

  copy(): MiscItem {
    return new MiscItem({
      name: this.name,
      id: v4(),
      amazonProducts: this.amazonProducts,
    });
  }
}
