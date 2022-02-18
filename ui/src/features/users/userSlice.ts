import { IdToken } from '@auth0/auth0-react';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setupInitialPLayground } from '../playgrounds/playgroundSlice';
import { UserState } from './userState';

const initialState: UserState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (
      state: UserState,
      action: PayloadAction<UserState>,
    ) => {
      state.jwt = action.payload.jwt;
    }
  }
});

// TODO: make this less implicit, consider redux-saga
export const setUser = createAsyncThunk(
  'user/setUser',
  async (idToken: IdToken, { dispatch }) => {
    const jwt = idToken.__raw;
    dispatch(userSlice.actions.set({
      jwt,
    }));
    dispatch(setupInitialPLayground(jwt));
  }
);

export default userSlice.reducer;
