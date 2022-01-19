import { RootState } from '../../app/rootState';
import planEntityAdapter from './planEntityAdapter';

export const planSelectors = planEntityAdapter.getSelectors<RootState>(
  (state) => state.plans
);