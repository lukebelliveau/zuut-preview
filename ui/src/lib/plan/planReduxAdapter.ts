import { PlanPayload } from '../../features/plans/planPayload';
import { assertDefined } from '../assert';
import Plan, { IPlan } from '../plan';

export default class PlanReduxAdapter {
  public static planToState(plan: Plan): IPlan {
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

  public static stateToPlan(planState: IPlan | undefined) {
    return new Plan(
      planState?.name,
      planState?.room?.width,
      planState?.room?.length,
      planState?.room?.height,
      planState?.id,
    );
  }
}