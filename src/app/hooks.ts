import { useDispatch } from 'react-redux';

import Plan from '../lib/plan';
import { AppDispatch, store } from './store';
import { selectById as selectPlanById } from '../features/plans/planSelectors';
import { create } from '../features/plans/planSlice';
import { planStateBuilder } from '../features/plans/planReduxAdapter';


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export function useSandboxPlan(): Plan {
  const dispatch = useDispatch();
  const plan = selectPlanById(store.getState(), '0');

  if (plan) {
    return plan;
  } else {
    const newPlan = new Plan();
    dispatch(create(planStateBuilder(newPlan)));
    return newPlan;
  }
}