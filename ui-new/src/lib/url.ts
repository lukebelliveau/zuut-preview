import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { PATH_CART } from 'src/routes/paths';
// import { shopping_cart_path } from '../routes/ShoppingCart';
import { IItem } from './item';

function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export const paramKeys = {
  recordIds: 'recordIds',
  shared: 'shared',
  growId: 'growId',
  selectedItems: 'selectedItems',
};

export const shoppingCartUrlWithRecordIds = (items: IItem[], selectedIds: string[]) => {
  const recordIds: string[] = [];

  items.forEach((item) => {
    if (item.recordId && selectedIds.includes(item.id)) {
      recordIds.push(item.recordId);
      if (item.modifiers) {
        Object.values(item.modifiers).forEach((modifier) => {
          // add one recordId per modifier for each time it's been added to the item
          if (modifier.recordId && modifier.ids.length > 0) {
            for (let i = 0; i < modifier.ids.length; i++) {
              recordIds.push(modifier.recordId);
            }
          }
        });
      }
    }
  });

  const serializedRecordIds = JSON.stringify(recordIds);

  return `${PATH_CART.root}?${paramKeys.recordIds}=${serializedRecordIds}`;
};

export default useQueryParams;
