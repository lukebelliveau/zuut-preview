import { useEffect } from 'react';
import { useQueryItemASINs } from 'src/lib/itemsLibrary';
import { useSelectItemCount } from 'src/redux/features/cart/cartSelectors';
import { setAllProducts } from 'src/redux/features/cart/cartSlice';
import { dispatch } from 'src/redux/store';

const useLoadDefaultItemASINs = () => {
  // only update when item count changes (from 0)
  const itemCount = useSelectItemCount();
  const { data: itemASINs } = useQueryItemASINs();
  useEffect(() => {
    // ASINs have not been loaded into state, but they have been loaded from API
    if (itemCount === 0 && itemASINs !== undefined && Object.keys(itemASINs).length > 0) {
      dispatch(setAllProducts(itemASINs));
    }
  }, [itemASINs, itemCount]);
};

export default useLoadDefaultItemASINs;
