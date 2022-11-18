import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from './cartState';

const initialState: CartState = {
  selectedProductASINs: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAllProducts: (state: CartState, action: PayloadAction<{ [itemName: string]: string }>) => {
      state.selectedProductASINs = action.payload;
    },
    setProductASIN: (
      state: CartState,
      action: PayloadAction<{ itemName: string; selectedASIN: string }>
    ) => {
      state.selectedProductASINs[action.payload.itemName] = action.payload.selectedASIN;
    },
  },
});

export const { setAllProducts, setProductASIN } = cartSlice.actions;

export default cartSlice.reducer;
