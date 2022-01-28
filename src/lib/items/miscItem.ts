import { v4 } from 'uuid';
import { Item } from './item';

export default class MiscItem implements Item {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;

  constructor(name: string, id: string = v4(), x: number = 0, y: number = 0, width: number = 30, length: number = 30, height: number = 30) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
  }

  setStartingXPosition(x: number) {
    this.x = x;
  }

  setStartingYPosition(y: number) {
    this.y = y;
  }
}