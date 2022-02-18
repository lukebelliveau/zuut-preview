import { v4 } from 'uuid';
import Grid from './grid';
import Room from './room';

export default class Plan {
  id: string;
  name: string | undefined;
  room: Room;
  grid: Grid;

  constructor(name?: string, width: number = 0, length: number = 0, height?: number, id: string = v4()) {
    this.id = id;
    this.name = name;

    this.room = new Room(width, length, height);
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