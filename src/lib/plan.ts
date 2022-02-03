import Room from './room';

export default class Plan {
  id: string;
  name: string | undefined;
  room: Room | undefined;

  public static sandbox() {
    return new Plan(undefined, undefined, undefined, undefined, '0');
  }

  constructor(name?: string, width: number = 0, length: number = 0, height?: number, id: string = '0') {
    this.id = id;
    this.name = name;

    this.room = new Room(width, length, height);
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