import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/rootState';
import planEntityAdapter from './planEntityAdapter';

const DEFAULT_PLAN_ID = '0';

export const planSelectors = planEntityAdapter.getSelectors<RootState>(
  (state) => state.plans
);

export const useSelectPlanById = (id: string) => {
  return useAppSelector((state) => planSelectors.selectById(state, id));
};

export const useSelectAllItemEntities = () =>
  useAppSelector(planSelectors.selectEntities);

export const useSelectAllPlans = () => useAppSelector(planSelectors.selectAll);

export const useSelectDefaultPlan = () => {
  return useAppSelector((state) =>
    planSelectors.selectById(state, DEFAULT_PLAN_ID)
  );
};
