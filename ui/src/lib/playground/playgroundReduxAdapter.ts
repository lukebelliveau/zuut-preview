import { PlaygroundState } from '../../features/playgrounds/playgroundState';
import { IPlan } from '../plan';
import PlanReduxAdapter from '../plan/planReduxAdapter';
import Playground from '../playground';

export default class PlaygroundReduxAdapter {
  public static playgroundToState(playground: Playground): PlaygroundState {
    return {
      planId: playground.plan?.id || '',
      displayWidth: playground.displayWidth,
      displayHeight: playground.displayHeight,
      centerX: playground.centerX,
      centerY: playground.centerY,
      scale: playground.scale,
    };
  }

  public static playgroundFromState(
    planState: IPlan | undefined,
    playgroundState: PlaygroundState
  ): Playground {
    const plan = planState
      ? PlanReduxAdapter.stateToPlan(planState)
      : undefined;
    const playground = new Playground(
      playgroundState.displayWidth,
      playgroundState.displayHeight,
      playgroundState.scale,
      plan,
      playgroundState.centerX,
      playgroundState.centerY
    );
    return playground;
  }
}
