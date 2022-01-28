import { store } from '../../app/store';
import { selectPlaygroundState } from '../../features/playgrounds/playgroundSelector';
import { addItem, resize, update, zoom } from '../../features/playgrounds/playgroundSlice';
import { PlaygroundState } from '../../features/playgrounds/playgroundState';
import PlanReduxAdapter from '../plan/planReduxAdapter';
import Playground from '../playground';
import { PlaygroundAdapter } from './playgroundAdapter';

export default class PlaygroundReduxAdapter implements PlaygroundAdapter {
  select(): Playground {
    const playgroundState = selectPlaygroundState(store.getState());

    return PlaygroundReduxAdapter.playgroundFromState(playgroundState);
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

  addItem(playground: Playground) {
    store.dispatch(addItem(PlaygroundReduxAdapter.playgroundToState(playground)));
  }

  public static playgroundToState(playground: Playground): PlaygroundState {
    return {
      planId: playground.plan?.id,
      displayWidth: playground.displayWidth,
      displayHeight: playground.displayHeight,
      centerX: playground.centerX,
      centerY: playground.centerY,
      scale: playground.scale,
      items: playground.items.map((item) => ({
        name: item.name,
        x: item.x,
        y: item.y,
        width: item.width,
        length: item.length,
        height: item.height
      }))
    };
  }

  public static playgroundFromState(playgroundState: PlaygroundState): Playground {
    const planAdapter = new PlanReduxAdapter();
    const plan = planAdapter.selectById(playgroundState.planId || '0');

    return new Playground(
      playgroundState.displayWidth,
      playgroundState.displayHeight,
      playgroundState.scale,
      plan,
      playgroundState.centerX,
      playgroundState.centerY,
      playgroundState.items
    );
  }
}