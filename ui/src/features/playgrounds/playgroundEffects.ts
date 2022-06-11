import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isDemoMode, ZUUT_DEMO_STATE } from '../../app/store';
import { addMany } from '../items/itemsSlice';
import { create as createPlan } from '../plans/planSlice';
import { createDemoPlan, resizePlayground, setPlan } from './playgroundSlice';

export const useLoadDemoPlan = () => {
  const dispatch = useDispatch();

  if (isDemoMode()) {
    const persistentState = localStorage.getItem(ZUUT_DEMO_STATE)
      ? JSON.parse(localStorage.getItem(ZUUT_DEMO_STATE) || '')
      : {};

    try {
      const { playground, plans, items } = persistentState;
      const plan = plans.entities[playground.planId];

      if (
        playground !== undefined &&
        plan !== undefined &&
        items !== undefined
      ) {
        // load plan
        dispatch(createPlan(plan));
        // set playground planId to that plan
        dispatch(setPlan(plan.id));
        // load items
        dispatch(addMany(items.present.entities));
        return;
      }
    } catch (e) {
      console.error('ERROR building demo playground: ' + e);
    }

    dispatch(createDemoPlan());
  }
};

export const useResizePlaygroundOnWindowResize = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();

  window.onresize = function () {
    dispatch(resizePlayground());
  };

  useEffect(() => {
    if (firstLoad) {
      dispatch(resizePlayground());
      setFirstLoad(false);
    }
  }, [firstLoad, dispatch]);
};
