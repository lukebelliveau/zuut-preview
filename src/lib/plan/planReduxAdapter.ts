import { store } from '../../app/store';
import { planSelectors } from '../../features/plans/planSelectors';
import { create, update } from '../../features/plans/planSlice';
import { PlanState } from '../../features/plans/planState';
import Plan from '../plan';
import { PlanAdapter } from './planAdapter';

export default class PlanReduxAdapter implements PlanAdapter {
  selectById(id: string): Plan {
    const planState = planSelectors.selectById(store.getState(), id);

    return this.stateToPlan(planState);
  }

  create(plan: Plan) {
    store.dispatch(create(this.planToState(plan)));
  }

  update(plan: Plan) {
    store.dispatch(update({
      id: plan.id,
      changes: this.planToState(plan)
    }));
  }

  private planToState(plan: Plan): PlanState {
    return {
      id: plan.id,
      name: plan.name,
      width: plan.width,
      length: plan.length,
      height: plan.height,
    };
  }

  private stateToPlan(planState: PlanState | undefined) {
    return new Plan(
      planState?.name,
      planState?.width,
      planState?.length,
      planState?.height,
      planState?.id,
    );
  }
}