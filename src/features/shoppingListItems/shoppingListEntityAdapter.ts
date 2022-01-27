import { createEntityAdapter } from '@reduxjs/toolkit';
import { ShoppingListState } from './shoppingListState';

const shoppingListEntityAdapter = createEntityAdapter<ShoppingListState>({
  sortComparer: (a, b) => {
    return a.name.localeCompare(b.name);
  }
});

export default shoppingListEntityAdapter;