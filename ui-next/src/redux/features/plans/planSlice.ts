import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import { v4 } from 'uuid';
import { isDemoMode, RootState } from '../../store';

import Plan from '../../../lib/plan';
import PlanReduxAdapter from '../../../lib/plan/planReduxAdapter';
import { setPlan } from '../playgrounds/playgroundSlice';
import { selectJwt } from '../users/userSelector';
import planAdapter from './planEntityAdapter';
import { PATH_APP } from 'src/routes/paths';

export const planSlice = createSlice({
  name: 'plan',
  initialState: planAdapter.getInitialState(),
  reducers: {
    create: planAdapter.addOne,
    update: planAdapter.updateOne,
    removeAll: planAdapter.removeAll,
  },
});

export const { create, update, removeAll } = planSlice.actions;

export default planSlice.reducer;
