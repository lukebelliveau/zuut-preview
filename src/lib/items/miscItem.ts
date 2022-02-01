import { v4 } from 'uuid';

export default class MiscItem {
  id: string;
  type: string = 'MiscItem';
  name: string;

  constructor(name: string, id: string = v4()) {
    this.id = id;
    this.name = name;
  }
}