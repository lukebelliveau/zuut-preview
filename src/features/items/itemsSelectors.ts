import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/rootState';
import itemsAdapter from './itemsEntityAdapter';

const itemsSelectors = itemsAdapter.getSelectors<RootState>(
  (state) => state.items
);

export const useSelectAllItems = () => useAppSelector(itemsSelectors.selectAll);

export const useSelectAllItemEntities = () =>
  useAppSelector(itemsSelectors.selectEntities);
