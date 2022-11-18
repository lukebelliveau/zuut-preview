import { useEffect, useState } from 'react';
import useAppDispatch from 'src/hooks/useAppDispatch';
import { resizePlayground } from './playgroundSlice';

export const useResizePlaygroundOnWindowResize = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onresize = function () {
        dispatch(resizePlayground());
      };
    }
  }, [dispatch]);

  useEffect(() => {
    if (firstLoad) {
      dispatch(resizePlayground());
      setFirstLoad(false);
    }
  }, [firstLoad, dispatch]);
};
