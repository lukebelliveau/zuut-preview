import { PlanState, RoomState } from '../../features/plans/planState';

export interface IPlanAdapter {
  selectById(id: string): PlanState | undefined;
  create(item: PlanState): void;
  updateRoom(plan: PlanState, width: number, length: number): void;
  getRoomCenter(plan: PlanState): { x: number; y: number };
  updateName(plan: PlanState, name: string): void;
}
