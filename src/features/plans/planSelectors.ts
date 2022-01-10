import { RootState } from '../../app/rootState';
import planReduxAdapter, { planBuilder } from './planReduxAdapter';

const planSelectors = planReduxAdapter.getSelectors<RootState>(
  (state) => state.plans
);

export function selectById(state: RootState, id: string) {
  const planState = planSelectors.selectById(state, id);
  if (!planState) throw new Error(`Plan not found: ${id}`);

  return planBuilder(planState);
}