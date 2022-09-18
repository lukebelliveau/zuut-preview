import useAppSelector from '../../../hooks/useAppSelector';
import { RootState } from '../../store';

export const interactionsState = (state: RootState) => state.interactions;

export const selectSelectedItemId = (state: RootState) => state.interactions.selected;

export const useSelectShowLayer = () => useAppSelector((state) => state.interactions.showLayer);
