import Playground from 'src/lib/playground';
import PlaygroundReduxAdapter from 'src/lib/playground/playgroundReduxAdapter';
import { useSelectPlanById } from 'src/redux/features/plans/planSelectors';
import { useSelectPlayground } from 'src/redux/features/playgrounds/playgroundSelector';

function useBuildPlayground(): Playground {
  const playgroundState = useSelectPlayground();
  const planState = useSelectPlanById(playgroundState.planId);
  return PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);
}

export default useBuildPlayground;
