import { v4 } from 'uuid';

export const MISC_ITEM_TYPE = 'MiscItem';

export default class MiscItem {
  id: string;
  type: string = MISC_ITEM_TYPE;
  name: string;

  constructor(name: string, id: string = v4()) {
    this.id = id;
    this.name = name;
  }

  copy(): MiscItem {
    return new MiscItem(this.name, v4());
  }
}