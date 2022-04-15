import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export const interactionsState = (state: RootState) => state.interactions;

export const selectSelectedItemId = (state: RootState) =>
  state.interactions.selected;

export const useSelectShowLayer = () =>
  useAppSelector((state) => state.interactions.showLayer);
