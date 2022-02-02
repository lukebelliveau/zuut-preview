import { createEntityAdapter } from '@reduxjs/toolkit';
import { ItemState } from './itemState';

const itemsEntityAdapter = createEntityAdapter<ItemState>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export default itemsEntityAdapter;
