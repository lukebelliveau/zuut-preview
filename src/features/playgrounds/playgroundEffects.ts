import PlaygroundRepository from '../../lib/playground/playgroundRepository';

export function resizePlaygroundOnWindowResize() {
  const sandbox = window.document.getElementById('sandbox');
  if (!sandbox) return;

  const playgroundRepo = PlaygroundRepository.forRedux();
  const playground = playgroundRepo.select();
  
  playground.setDisplayDimensions(sandbox.offsetWidth, sandbox.offsetHeight);
  playgroundRepo.resize(playground);
}