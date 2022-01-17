import Room from './objects/room';

export default class Plan {
  id: string;
  name: string | undefined;
  width: number | undefined;
  length: number | undefined;
  height: number | undefined;
  room: Room | undefined;

  public static sandbox() {
    return new Plan(undefined, undefined, undefined, undefined, '0');
  }

  constructor(name?: string, width?: number, length?: number, height?: number, id: string = '0') {
    this.id = id;
    this.name = name;
    this.width = width;
    this.length = length;
    this.height = height;

    if (width && length && height) this.room = new Room(width, length, height);
  }
}