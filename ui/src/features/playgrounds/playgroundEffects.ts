import { store } from '../../app/store';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import { selectDefaultPlan } from '../plans/planSelectors';
import { selectPlaygroundState } from './playgroundSelector';
import { resize } from './playgroundSlice';

export function resizePlaygroundOnWindowResize() {
  const sandbox = window.document.getElementById('sandbox');
  if (!sandbox) return;

  const playgroundState = selectPlaygroundState(store.getState());
  const planState = selectDefaultPlan(store.getState());
  const playground = PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);

  playground.setDisplayDimensions(sandbox.offsetWidth, sandbox.offsetHeight);

  store.dispatch(resize(PlaygroundReduxAdapter.playgroundToState(playground)));
}