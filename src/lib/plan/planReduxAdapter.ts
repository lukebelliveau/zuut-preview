import { store } from '../../app/store';
import { planSelectors } from '../../features/plans/planSelectors';
import { create, update } from '../../features/plans/planSlice';
import { PlanState } from '../../features/plans/planState';
import Plan from '../plan';
import { PlanAdapter } from './planAdapter';

export default class PlanReduxAdapter implements PlanAdapter {
  public static planToState(plan: Plan): PlanState {
    return {
      id: plan.id,
      name: plan.name,
      width: plan.width,
      length: plan.length,
      height: plan.height,
    };
  }

  public static stateToPlan(planState: PlanState | undefined) {
    return new Plan(
      planState?.name,
      planState?.width,
      planState?.length,
      planState?.height,
      planState?.id,
    );
  }

  selectById(id: string): Plan {
    const planState = planSelectors.selectById(store.getState(), id);

    return PlanReduxAdapter.stateToPlan(planState);
  }

  create(plan: Plan) {
    store.dispatch(create(PlanReduxAdapter.planToState(plan)));
  }

  update(plan: Plan) {
    store.dispatch(update({
      id: plan.id,
      changes: PlanReduxAdapter.planToState(plan)
    }));
  }
}