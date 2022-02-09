import { createEntityAdapter } from '@reduxjs/toolkit';
import { PlanState } from './planState';

const planEntityAdapter = createEntityAdapter<PlanState>({
  sortComparer: (a, b) => {
    if (a.name && b.name)
      return a.name.localeCompare(b.name);
    else
      return a.id.localeCompare(b.id);
  }
});

export default planEntityAdapter;