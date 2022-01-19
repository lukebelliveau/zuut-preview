import { store } from '../../app/store';
import { selectPlayground } from '../../features/playgrounds/playgroundSelector';
import { update } from '../../features/playgrounds/playgroundSlice';
import { PlaygroundState } from '../../features/playgrounds/playgroundState';
import { Adapter } from '../adapter';
import PlanReduxAdapter from '../plan/planReduxAdapter';
import Playground from '../playground';

export default class PlaygroundReduxAdapter implements Adapter<Playground> {
  select(): Playground {
    const playgroundState = selectPlayground(store.getState());

    const planAdapter = new PlanReduxAdapter();
    const plan = planAdapter.selectById(playgroundState.planId || '0');

    return new Playground(
      playgroundState.displayWidth,
      playgroundState.displayHeight,
      playgroundState.scale,
      plan
    );
  }

  selectById(id: string): Playground {
    throw new Error('Playground#selectById not implemented');
  }

  create(playground: Playground) {
    throw new Error('Playground#create not implemented');
  }

  update(playground: Playground) {
    const playgroundState: PlaygroundState = {
      planId: playground.plan?.id,
      displayWidth: playground.displayWidth,
      displayHeight: playground.displayHeight,
      scale: playground.scale,
    };
    store.dispatch(update(playgroundState));
  }
}