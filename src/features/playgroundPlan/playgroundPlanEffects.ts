import Plan from '../../lib/plan';
import { planStateBuilder } from './playgourndPlanReduxAdapter';
import { resize } from './playgroundPlanSlice';
import { selectPlan } from './playgroundSelectors';

export function resizePlaygroundOnWindowResize(store: any) {
  const sandbox = window.document.getElementById('sandbox');
  if (!sandbox) return;

  const plan = selectPlan();
  if (!plan) { throw new Error("Can't find plan"); }
    
  const newPlan = planStateBuilder(Plan.withUpdatedDimensions(
    plan,
    sandbox.clientWidth,
    sandbox.clientHeight
  ));

  store.dispatch(resize(newPlan));
}