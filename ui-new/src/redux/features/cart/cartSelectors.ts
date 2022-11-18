import useAppSelector from 'src/hooks/useAppSelector';

export const useSelectItemCount = () =>
  useAppSelector((state) => Object.keys(state.cart.selectedProductASINs).length);

export const useSelectASINByItemType = (itemType: string) =>
  useAppSelector((state) => state.cart.selectedProductASINs[itemType]);
