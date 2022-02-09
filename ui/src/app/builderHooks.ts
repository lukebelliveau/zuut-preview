import { useSelectAllItems } from '../features/items/itemsSelectors';
import { useSelectPlanById } from '../features/plans/planSelectors';
import { useSelectPlayground } from '../features/playgrounds/playgroundSelector';
import ItemReduxAdapter from '../lib/item/itemReduxAdapter';
import ItemList from '../lib/itemList';
import Plan from '../lib/plan';
import Playground from '../lib/playground';
import PlaygroundReduxAdapter from '../lib/playground/playgroundReduxAdapter';

export function useBuildPlayground(): Playground {
  const playgroundState = useSelectPlayground();
  const planState = useSelectPlanById(playgroundState.planId);
  return PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);
}

export function useBuildItemList(): ItemList {
  const itemsState = useSelectAllItems();
  return ItemReduxAdapter.itemStatesToItemList(itemsState);
}

export function useBuildPlan(): Plan {
  const playground = useBuildPlayground();
  if (!playground.plan) throw new Error('No plan found');
  return playground.plan;
}