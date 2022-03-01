import { ItemState } from '../../features/items/itemState';
import ItemReduxAdapter from '../item/itemReduxAdapter';
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

  public static stateToPlan(planState: IPlan, itemStateList?: ItemState[]): Plan {
    const plan = new Plan(
      planState.name,
      planState.room?.width,
      planState.room?.length,
      planState.room?.height,
      planState.id,
    );

    if (itemStateList) {
      itemStateList.forEach(itemState => {
        const item = ItemReduxAdapter.stateToItem(itemState);
        plan.addItem(item);
      });
    }

    return plan;
  }
}