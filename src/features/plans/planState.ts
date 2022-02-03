export type PlanState = {
  id: string;
  name: string | undefined;
  room: RoomState | undefined;
}

export type RoomState = {
  width: number | undefined;
  length: number | undefined;
  height: number | undefined;
}
