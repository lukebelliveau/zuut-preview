import { createEntityAdapter } from '@reduxjs/toolkit';

import Plan from '../../lib/plan';

type PlanState = {
  id: string;
  name: string | undefined;
  width: number | undefined;
  length: number | undefined;
  height: number | undefined;
}

export function planStateBuilder(plan: Plan): PlanState {
  return {
    id: plan.id,
    name: plan.name,
    width: plan.width,
    length: plan.length,
    height: plan.height,
  };
}

export function planBuilder(planState: PlanState): Plan {
  return new Plan(
    planState.name,
    planState.width,
    planState.length,
    planState.height,
    planState.id,
  );
}

const planReduxAdapter = createEntityAdapter<PlanState>({
  sortComparer: (a, b) => {
    if (a.name && b.name)
      return a.name.localeCompare(b.name);
    else
      return a.id.localeCompare(b.id);
  }
});

export default planReduxAdapter;