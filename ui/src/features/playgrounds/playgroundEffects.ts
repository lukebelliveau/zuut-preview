import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resizePlayground } from './playgroundSlice';

export const useResizePlaygroundOnWindowResize = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();

  window.onresize = function() {
    dispatch(resizePlayground());
  };

  useEffect(() => {
    if (firstLoad) {
      dispatch(resizePlayground());
      setFirstLoad(false);
    }
  }, [firstLoad, dispatch]);
};
