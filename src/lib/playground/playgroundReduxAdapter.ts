import { store } from '../../app/store';
import { planSelectors } from '../../features/plans/planSelectors';
import { PlanState } from '../../features/plans/planState';
import { selectPlaygroundState } from '../../features/playgrounds/playgroundSelector';
import { resize, update, zoom } from '../../features/playgrounds/playgroundSlice';
import { PlaygroundState } from '../../features/playgrounds/playgroundState';
import PlanReduxAdapter from '../plan/planReduxAdapter';
import Playground from '../playground';
import { PlaygroundAdapter } from './playgroundAdapter';

export default class PlaygroundReduxAdapter implements PlaygroundAdapter {
  select(): Playground {
    const appState = store.getState();
    const playgroundState = selectPlaygroundState(store.getState());
    const planState = planSelectors.selectById(appState, playgroundState.planId);
    if (!planState) throw new Error('No plan found');
    
    return PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);
  }

  update(playground: Playground) {
    store.dispatch(update(PlaygroundReduxAdapter.playgroundToState(playground)));
  }

  resize(playground: Playground) {
    store.dispatch(resize(PlaygroundReduxAdapter.playgroundToState(playground)));
  }

  zoom(playground: Playground) {
    store.dispatch(zoom(PlaygroundReduxAdapter.playgroundToState(playground)));
  }

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

  public static playgroundFromState(planState: PlanState, playgroundState: PlaygroundState): Playground {
    return new Playground(
      playgroundState.displayWidth,
      playgroundState.displayHeight,
      playgroundState.scale,
      PlanReduxAdapter.stateToPlan(planState),
      playgroundState.centerX,
      playgroundState.centerY,
    );
  }
}