import { createEntityAdapter } from '@reduxjs/toolkit';
import Plan from '../../lib/plan';

type PlanState = {
  id: string;
  name: string;
  width: number;
  length: number;
}

export function planStateBuilder(plan: Plan): PlanState {
  return {
    id: plan.id,
    name: plan.name,
    width: plan.width,
    length: plan.length,
  };
}

export function planBuilder(planState: PlanState): Plan {
  return new Plan(
    planState.name,
    planState.width,
    planState.length,
    planState.id,
  );
}

const playgroundPlanReduxAdapter = createEntityAdapter<PlanState>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export default playgroundPlanReduxAdapter;