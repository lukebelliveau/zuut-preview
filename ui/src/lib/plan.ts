import { v4 } from 'uuid';
import Grid from './grid';
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

  constructor(name?: string, width: number = 0, length: number = 0, height?: number, id: string = v4()) {
    this.id = id;
    this.name = name;

    this.room = new Room(width, length, height);
    this.grid = new Grid(width, length);
  }

  setDimensions(width: number, length: number) {
    this.room = new Room(width, length);
    this.grid = new Grid(width, length);
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
}