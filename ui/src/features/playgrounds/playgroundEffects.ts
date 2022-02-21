import { store } from '../../app/store';
import { resizePlayground } from './playgroundSlice';

export function resizePlaygroundOnWindowResize() {
  store.dispatch(resizePlayground());
}