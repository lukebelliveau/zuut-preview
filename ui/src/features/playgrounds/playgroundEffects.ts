import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { useBuildPlayground } from '../../app/builderHooks';
import { isDemoMode, ZUUT_DEMO_STATE } from '../../app/store';
import { addMany } from '../items/itemsSlice';
import { create as createPlan } from '../plans/planSlice';
import { createDemoPlan, resizePlayground, setPlan } from './playgroundSlice';

export const useLoadDemoPlan = () => {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();

  if (isDemoMode() && !playground.plan) {
    const persistentState = localStorage.getItem(ZUUT_DEMO_STATE)
      ? JSON.parse(localStorage.getItem(ZUUT_DEMO_STATE) || '')
      : {};

    try {
      let { playground, plans, items } = persistentState;

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

  // if (isDemoMode() && !playground.plan) {
  //   const persistentState = localStorage.getItem(ZUUT_DEMO_STATE)
  //     ? JSON.parse(localStorage.getItem(ZUUT_DEMO_STATE) || '')
  //     : {};

  //   try {
  //     let { playground, plans, items } = persistentState;

  //     let plan = undefined;
  //     if (plans && plans.entities && plans.entities[playground.planId]) {
  //       plan = plans.entities[playground.planId];
  //     } else {
  //       const UNSAFE_PLAN_ID = v4();

  //       const UNSAFE_PLAYGROUND = {
  //         planId: UNSAFE_PLAN_ID,
  //         displayWidth: 711,
  //         displayHeight: 504,
  //         centerX: 10,
  //         centerY: 10,
  //         scale: 0.1511373578302712,
  //       };
  //       const UNSAFE_plan = {
  //         id: UNSAFE_PLAN_ID,
  //         name: 'Demo Playground',
  //         room: { width: 4572, length: 3048, offset: { x: 0, y: 0 } },
  //       };
  //       const UNSAFE_ITEMS = {
  //         past: [],
  //         present: { ids: [], entities: {} },
  //         future: [],
  //         group: null,
  //         _latestUnfiltered: { ids: [], entities: {} },
  //         index: 0,
  //         limit: 1,
  //       };

  //       playground = UNSAFE_PLAYGROUND;
  //       plan = UNSAFE_plan;
  //       // items = UNSAFE_ITEMS;
  //     }

  //     // if (
  //     //   playground !== undefined &&
  //     //   plan !== undefined &&
  //     //   items !== undefined
  //     // ) {
  //     //   console.log('ITEMS');
  //     //   console.log(JSON.stringify(items));
  //     //   // load plan
  //     //   dispatch(createPlan(plan));
  //     //   // set playground planId to that plan
  //     //   dispatch(setPlan(plan.id));
  //     //   // load items
  //     //   dispatch(addMany(items.present.entities));
  //     //   return;
  //     // } else {
  //     //   console.log('ELSE');
  //     //   console.log(playground);
  //     //   console.log(plan);
  //     // }
  //     if (playground !== undefined && plan !== undefined) {
  //       // load plan
  //       dispatch(createPlan(plan));
  //       // set playground planId to that plan
  //       dispatch(setPlan(plan.id));
  //       if (items !== undefined) {
  //         // load items
  //         dispatch(addMany(items.present.entities));
  //       }

  //       return;
  //     } else {
  //       // console.log('ELSE');
  //       // console.log(playground);
  //       // console.log(plan);
  //     }
  //   } catch (e) {
  //     console.error('ERROR building demo playground: ' + e);
  //   }

  //   // dispatch(createDemoPlan());
  // }
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
