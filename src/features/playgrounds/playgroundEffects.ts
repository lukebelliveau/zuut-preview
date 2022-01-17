import { resize } from './playgroundSlice';

export function resizePlaygroundOnWindowResize(store: any) {
  const sandbox = window.document.getElementById('sandbox');
  if (!sandbox) return;

  store.dispatch(resize({
    width: sandbox.offsetWidth - 20,
    length: sandbox.offsetHeight - 20
  }));
}