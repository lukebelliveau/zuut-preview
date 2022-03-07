import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import itemsAdapter from './itemsEntityAdapter';

export const itemsSelectors = itemsAdapter.getSelectors<RootState>(
  (state) => state.items.present
);

export const useSelectAllItems = () => useAppSelector(itemsSelectors.selectAll);

export const useSelectAllItemEntities = () =>
  useAppSelector(itemsSelectors.selectEntities);

export const useSelectItemById = (id: string | undefined = '') => {
  return useAppSelector((state) => itemsSelectors.selectById(state, id));
};
