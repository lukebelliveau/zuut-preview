import { RootState } from '../../app/store';

export const interactionsState = (state: RootState) => state.interactions;

export const selectSelectedItemId = (state: RootState) =>
  state.interactions.selected;
