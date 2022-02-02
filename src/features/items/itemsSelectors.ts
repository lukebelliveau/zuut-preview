import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/rootState';
import itemsAdapter from './itemsEntityAdapter';
import { PlaceableItemState } from './itemState';

const itemsSelectors = itemsAdapter.getSelectors<RootState>(
  (state) => state.items
);

export const useSelectAllItems = () => useAppSelector(itemsSelectors.selectAll);

export const useSelectAllItemEntities = () =>
  useAppSelector(itemsSelectors.selectEntities);

export const useSelectAllPlaceableItems = (): PlaceableItemState[] => {
  return useAppSelector(itemsSelectors.selectAll).filter(
    (item): item is PlaceableItemState => item.placement !== undefined
  );
};
