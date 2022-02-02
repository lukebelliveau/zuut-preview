import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/rootState';
import planEntityAdapter from './planEntityAdapter';

export const planSelectors = planEntityAdapter.getSelectors<RootState>(
  (state) => state.plans
);

export const useSelectPlanById = (id: string) => {
  return useAppSelector((state) => planSelectors.selectById(state, id));
};