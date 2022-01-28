import { v4 } from 'uuid';
import MiscItem from './miscItem';
export default class Growspace extends MiscItem {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;
  items: MiscItem[];

  constructor(name: string = '24x24x36 tent', id: string = v4(), x: number = 0, y: number = 0, width: number = 610, length: number = 610, height: number = 915, items = []) {
    super(name, id);
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
    this.items = items;
  }
}