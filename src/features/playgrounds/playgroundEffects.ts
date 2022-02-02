import usePlaygroundAdapter from '../../lib/playground/playgroundAdapter';

const usePlaygroundEffects = () => {
  const playgroundAdapter = usePlaygroundAdapter();
  const resizePlaygroundOnWindowResize = () => {
    const sandbox = window.document.getElementById('sandbox');
    if (!sandbox) return;

    playgroundAdapter.setDisplayDimensions(
      sandbox.offsetWidth,
      sandbox.offsetHeight
    );
  };

  return {
    resizePlaygroundOnWindowResize,
  };
};

export default usePlaygroundEffects;
