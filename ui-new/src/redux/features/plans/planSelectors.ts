import { createSelector } from '@reduxjs/toolkit';
import useAppSelector from '../../../hooks/useAppSelector';
import { RootState } from '../../store';
import planEntityAdapter from './planEntityAdapter';

export const planSelectors = planEntityAdapter.getSelectors<RootState>((state) => state.plans);

export const useSelectPlanById = (id: string) => {
  return useAppSelector((state) => planSelectors.selectById(state, id));
};

export const useSelectAllPlans = () => useAppSelector(planSelectors.selectAll);

export const selectDefaultPlan = createSelector(
  [(state: RootState) => planSelectors.selectAll(state)[0]],
  (state) => state
);

export const useSelectDefaultPlan = () => {
  return useAppSelector(selectDefaultPlan);
};
