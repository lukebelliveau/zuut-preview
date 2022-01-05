import { RootState } from '../../app/rootState';
import { store } from '../../app/store';
import Plan from '../../lib/plan';
import playgroundPlanReduxAdapter, { planBuilder } from './playgourndPlanReduxAdapter';

const playgroundPlanSelectors = playgroundPlanReduxAdapter.getSelectors<RootState>(
  (state) => state.playgroundPlan
);

export function selectPlaygroundPlan(): Plan | undefined {
  const plans = playgroundPlanSelectors.selectAll(store.getState());
  if (plans.length > 0) {
    return planBuilder(plans[0]);
  } else {
    return undefined;
  }
}
