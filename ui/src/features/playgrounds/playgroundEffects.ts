import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useBuildPlayground } from '../../app/builderHooks';
import { isDemoMode } from '../../app/store';
import { feetToMm } from '../../lib/conversions';
import Plan from '../../lib/plan';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import { create } from '../plans/planSlice';
import { resizePlayground, setPlan } from './playgroundSlice';

export const useLoadDemoPlan = () => {
  const playground = useBuildPlayground();
  const dispatch = useDispatch();
  if (isDemoMode() && !playground.plan) {
    const plan = new Plan('Demo Playground', feetToMm(50), feetToMm(50));
    dispatch(create(PlanReduxAdapter.planToState(plan)));
    dispatch(setPlan(plan.id));
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
