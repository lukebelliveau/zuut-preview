import { RootState } from '../../app/rootState';

export const interactionsState = (state: RootState) => state.interactions;

export const selectSelectedItemId = (state: RootState) =>
  state.interactions.selected;
