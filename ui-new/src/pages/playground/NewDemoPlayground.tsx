import { Navigate } from 'react-router-dom';

import { isDemoMode, ZUUT_DEMO_STATE, useDispatch } from '../../redux/store';

import { removeAll as removeAllPlans } from '../../redux/features/plans/planSlice';
import { removeAllItems } from '../../redux/features/items/itemsSlice';
import { createDemoPlan } from '../../redux/features/playgrounds/playgroundSlice';
import { useEffect } from 'react';
import { PATH_PLAYGROUND } from 'src/routes/paths';

export const new_demo_path = () => '/newdemo';
const NewDemoPlayground = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAllPlans());
    dispatch(removeAllItems(true));
    localStorage.removeItem(ZUUT_DEMO_STATE);
    dispatch(createDemoPlan());
  });

  if (!isDemoMode()) {
    return <Navigate to={PATH_PLAYGROUND.general.new} replace />;
  }

  return <Navigate to={PATH_PLAYGROUND.general.demo} replace />;
};

export default NewDemoPlayground;
