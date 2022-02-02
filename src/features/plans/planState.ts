export interface PlanState {
  id: string;
  name: string | undefined;
  room: RoomState | undefined;
}

export interface RoomState {
  width: number;
  length: number;
  height: number | undefined;
  x: number;
  y: number;
}
