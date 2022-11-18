import { v4 } from 'uuid';

import Grid from './grid';
import { IItem, Item } from './item';
import { Point } from './point';
import Room, { IRoom } from './room';

export interface IPlan {
  id: string;
  name?: string;
  room: IRoom;
}

export default class Plan implements IPlan {
  id: string;
  name?: string;
  room: Room;
  grid: Grid;
  items: IItem[] = [];

  constructor(
    name?: string,
    width: number = 0,
    length: number = 0,
    height?: number,
    id: string = v4()
  ) {
    this.id = id;
    this.name = name;

    this.room = new Room(width, length, height);
    this.grid = new Grid(width, length);
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  setDimensions(width: number, length: number) {
    this.room = new Room(width, length);
    this.grid = new Grid(width, length);
  }

  setName(name: string) {
    this.name = name;
  }

  get width(): number | undefined {
    return this.room?.width;
  }
  get length(): number | undefined {
    return this.room?.length;
  }
  get height(): number | undefined {
    return this.room?.height;
  }

  get northWest(): Point {
    return { x: 0, y: 0 };
  }

  get northEast(): Point {
    return { x: this.width || 0, y: 0 };
  }

  get southWest(): Point {
    return { x: 0, y: this.length || 0 };
  }

  get southEast(): Point {
    return { x: this.width || 0, y: this.length || 0 };
  }
}
