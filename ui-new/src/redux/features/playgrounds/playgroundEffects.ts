import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useAppDispatch from 'src/hooks/useAppDispatch';
import { v4 } from 'uuid';
import useBuildPlayground from '../../../hooks/useBuildPlayground';
import { isDemoMode, ZUUT_DEMO_STATE } from '../../store';
import { addMany } from '../items/itemsSlice';
import { create as createPlan } from '../plans/planSlice';
import { createDemoPlan, resizePlayground, setPlan } from './playgroundSlice';

export const useLoadDemoPlan = () => {
  const dispatch = useAppDispatch();
  const playground = useBuildPlayground();

  if (isDemoMode() && !playground.plan) {
    const persistentState = localStorage.getItem(ZUUT_DEMO_STATE)
      ? JSON.parse(localStorage.getItem(ZUUT_DEMO_STATE) || '')
      : {};

    try {
      const { playground, plans, items } = persistentState;

      let plan = undefined;
      if (plans && plans.entities && plans.entities[playground.planId]) {
        plan = plans.entities[playground.planId];
        // load plan
        dispatch(createPlan(plan));
        // set playground planId to that plan
        dispatch(setPlan(plan.id));
        // load items
        dispatch(addMany(items.present.entities));
        return;
      } else {
        dispatch(createDemoPlan());
      }
    } catch (e) {
      console.error('ERROR building demo playground: ' + e);
    }
  }
};

export const useResizePlaygroundOnWindowResize = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.onresize = function () {
  //       dispatch(resizePlayground());
  //     };
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (firstLoad) {
      dispatch(resizePlayground());
      setFirstLoad(false);
    }
  }, [firstLoad, dispatch]);
};