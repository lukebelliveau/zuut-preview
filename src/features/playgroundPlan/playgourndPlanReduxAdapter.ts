import { createEntityAdapter } from '@reduxjs/toolkit';
import Plan from '../../lib/plan';

type PlanState = {
  id: string;
  name: string;
  width: number;
  length: number;
  height: number;
  displayWidth: number;
  displayHeight: number;
}

export function planStateBuilder(plan: Plan): PlanState {
  return {
    id: plan.id,
    name: plan.name,
    width: plan.width,
    length: plan.length,
    height: plan.height,
    displayWidth: plan.displayWidth,
    displayHeight: plan.displayHeight
  };
}

export function planBuilder(planState: PlanState): Plan {
  return new Plan(
    planState.name,
    planState.width,
    planState.length,
    planState.height,
    planState.displayWidth,
    planState.displayHeight,
    planState.id,
  );
}

const playgroundPlanReduxAdapter = createEntityAdapter<PlanState>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export default playgroundPlanReduxAdapter;