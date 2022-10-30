import useAppSelector from '../../../hooks/useAppSelector';
import { RootState } from '../../store';
import itemsAdapter from './itemsEntityAdapter';

export const itemsSelectors = itemsAdapter.getSelectors<RootState>((state) => state.items);

export const useSelectUndoStack = () => useAppSelector((state) => state.items);

export const useSelectRedoStack = () => useAppSelector((state) => state.items);

export const useSelectAllItems = () => useAppSelector(itemsSelectors.selectAll);

export const useSelectAllItemEntities = () => useAppSelector(itemsSelectors.selectEntities);

export const useSelectAllItemIds = () => useAppSelector(itemsSelectors.selectIds);

export const useSelectItemById = (id: string | undefined = '') => {
  return useAppSelector((state) => itemsSelectors.selectById(state, id));
};
