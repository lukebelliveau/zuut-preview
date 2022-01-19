import Plan from '../plan';

export interface PlanAdapter {
  selectById(id: string): Plan;
  create(item: Plan): void;
  update(item: Plan): void;
}