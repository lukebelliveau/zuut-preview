import { RootState } from '../../app/rootState';
import Plan from '../../lib/plan';
import planReduxAdapter, { planBuilder } from './planReduxAdapter';

export const planSelectors = planReduxAdapter.getSelectors<RootState>(
  (state) => state.plans
);

export function selectById(state: RootState, id: string): Plan | undefined {
  const planState = planSelectors.selectById(state, id);
  if (planState) {
    return planBuilder(planState);
  } else {
    return undefined;
  }
}