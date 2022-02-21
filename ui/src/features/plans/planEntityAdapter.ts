import { createEntityAdapter } from '@reduxjs/toolkit';
import { IPlan } from '../../lib/plan';

const planEntityAdapter = createEntityAdapter<IPlan>({
  sortComparer: (a, b) => {
    if (a.name && b.name)
      return a.name.localeCompare(b.name);
    else
      return a.id.localeCompare(b.id);
  }
});

export default planEntityAdapter;