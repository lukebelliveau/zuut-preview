import { createSelector } from '@reduxjs/toolkit';
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

export const useSelectAllPlans = () => useAppSelector(planSelectors.selectAll);

export const selectDefaultPlan = createSelector([(state: RootState) => planSelectors.selectById(state, DEFAULT_PLAN_ID)], state => state);

export const useSelectDefaultPlan = () => {
  return useAppSelector(selectDefaultPlan);
};
