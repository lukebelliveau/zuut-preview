import Plan from 'src/lib/plan';
import useBuildPlayground from './useBuildPlayground';

function useBuildPlan(): Plan {
  const playground = useBuildPlayground();
  if (!playground.plan) throw new Error('No plan found');
  return playground.plan;
}

export default useBuildPlan;
