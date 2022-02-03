import { PlanState } from '../../features/plans/planState';
import Plan from '../plan';

export default class PlanReduxAdapter {
  public static planToState(plan: Plan): PlanState {
    return {
      id: plan.id,
      name: plan.name,
      room: {
        width: plan.width,
        length: plan.length,
        height: plan.height,
      }
    };
  }

  public static stateToPlan(planState: PlanState | undefined) {
    return new Plan(
      planState?.name,
      planState?.room?.width,
      planState?.room?.length,
      planState?.room?.height,
      planState?.id,
    );
  }
}