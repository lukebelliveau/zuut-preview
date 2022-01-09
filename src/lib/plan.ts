import { v4 as uuidv4 } from 'uuid';

export default class Plan {
  id: string;
  name: string;
  width: number;
  length: number;
  height: number;
  displayWidth: number;
  displayHeight: number;

  public static withUpdatedDimensions(plan: Plan, width: number, height: number): Plan {
    return new Plan(
      plan.id,
      plan.width,
      plan.length,
      plan.height,
      width,
      height,
      plan.id
    );
  }

  constructor(name: string, width: number, length: number, height: number, displayWidth: number, displayHeight: number, id: string = uuidv4()) {
    this.id = id;
    this.name = name;
    this.width = width;
    this.length = length;
    this.height = height;
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
  }
}