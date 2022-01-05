import { v4 as uuidv4 } from 'uuid';

export default class Plan {
  id: string;
  name: string;
  width: number;
  length: number;

  constructor(name: string, width: number, length: number, id: string = uuidv4()) {
    this.id = id;
    this.name = name;
    this.width = width;
    this.length = length;
  }
}