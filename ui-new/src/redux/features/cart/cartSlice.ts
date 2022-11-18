import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dispatch } from 'src/redux/store';
import { selectMany } from '../interactions/interactionsSlice';
import { addMany } from '../items/itemsSlice';
import { create } from '../plans/planSlice';
import { setPlan } from '../playgrounds/playgroundSlice';
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

export const loadFirebaseCart = async (grow: any) => {
  const plan = grow.plans.entities[grow.playground.planId];
  const { cart } = grow;
  const { interactions } = grow;

  if (cart && cart.selectedProductASINs) {
    dispatch(setAllProducts(cart.selectedProductASINs));
  }
  if (interactions && interactions.selected) {
    dispatch(selectMany(interactions.selected));
  }
  if (grow && grow.items && plan) {
    dispatch(create(plan));
    dispatch(setPlan(plan.id));
    dispatch(addMany(grow.items.present.entities));
  } else {
    throw new Error('Attempted to load firebase cart with bad grow.');
  }
};

export const { setAllProducts, setProductASIN } = cartSlice.actions;

export default cartSlice.reducer;
