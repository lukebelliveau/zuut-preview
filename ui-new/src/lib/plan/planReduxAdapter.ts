import { RootState } from '../../redux/store';
import { itemsSelectors } from '../../redux/features/items/itemsSelectors';
import { ItemState } from '../../redux/features/items/itemState';
import { selectDefaultPlan } from '../../redux/features/plans/planSelectors';
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
        offset: plan.room.offset,
      },
    };
  }

  public static stateToPlan(planState: IPlan, itemStateList?: ItemState[]): Plan {
    const plan = new Plan(
      planState.name,
      planState.room?.width,
      planState.room?.length,
      planState.room?.height,
      planState.id
    );

    if (itemStateList) {
      itemStateList.forEach((itemState) => {
        const item = ItemReduxAdapter.stateToItem(itemState);
        plan.addItem(item);
      });
    }

    return plan;
  }

  state: RootState;

  constructor(state: RootState) {
    this.state = state;
  }

  current(): Plan {
    const planState = selectDefaultPlan(this.state);
    const itemListState = itemsSelectors.selectAll(this.state);
    return PlanReduxAdapter.stateToPlan(planState, itemListState);
  }
}
