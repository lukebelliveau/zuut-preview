import { useDispatch } from 'react-redux';

import Plan from '../lib/plan';
import { AppDispatch, store } from './store';
import { selectById as selectPlanById } from '../features/plans/planSelectors';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export function useSandboxPlan(): Plan | undefined {
  return selectPlanById(store.getState(), '0');
}
