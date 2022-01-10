import { resize } from './playgroundSlice';

export function resizePlaygroundOnWindowResize(store: any) {
  const sandbox = window.document.getElementById('sandbox');
  if (!sandbox) return;

  store.dispatch(resize({
    width: sandbox.clientWidth,
    length: sandbox.clientHeight
  }));
}