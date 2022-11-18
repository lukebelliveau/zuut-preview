import { createEntityAdapter } from '@reduxjs/toolkit';
import { ItemState } from './itemState';

const itemsEntityAdapter = createEntityAdapter<ItemState>({
  sortComparer: (a, b) => {
    if (a.name.localeCompare(b.name) === 0) {
      return a.id.localeCompare(b.id);
    }

    return a.name.localeCompare(b.name);
  },
});

export default itemsEntityAdapter;
