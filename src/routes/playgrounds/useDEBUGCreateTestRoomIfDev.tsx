import { useDispatch } from 'react-redux';
import { create } from '../../features/plans/planSlice';
import { PlanState } from '../../features/plans/planState';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import { update } from '../../features/playgrounds/playgroundSlice';
import { feetToMm } from '../../lib/conversions';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';

/**
 * for debugging only.
 *
 * create a new Plan and assign it to the Playground without clicking through the New Playground workflow.
 */
export const useDEBUGCreateTestRoomIfDev = (width: number, length: number) => {
  const dispatch = useDispatch();
  const playgroundState = useSelectPlayground();

  if (!process.env.REACT_APP_TEST_PLAYGROUND) return;

  const planState: PlanState = {
    name: 'Test Plan',
    id: '0',
    room: {
      width: feetToMm(width),
      length: feetToMm(length),
      height: undefined,
    },
  };

  const playground = PlaygroundReduxAdapter.playgroundFromState(
    planState,
    playgroundState
  );

  dispatch(create(planState));
  dispatch(update(PlaygroundReduxAdapter.playgroundToState(playground)));
};
