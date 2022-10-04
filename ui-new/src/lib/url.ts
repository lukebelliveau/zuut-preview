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
};

export const shoppingCartUrlWithRecordIds = (items: IItem[]) => {
  const recordIds: string[] = [];

  items.forEach((item) => {
    if (item.recordId) recordIds.push(item.recordId);
  });

  const serializedRecordIds = JSON.stringify(recordIds);

  return `${PATH_CART.root}?${paramKeys.recordIds}=${serializedRecordIds}`;
};

export default useQueryParams;
