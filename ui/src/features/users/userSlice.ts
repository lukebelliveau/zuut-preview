import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './userState';

const initialState: UserState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state: UserState,
      action: PayloadAction<string>,
    ) => {
      state.jwt = action.payload;
    }
  }
});

 export const { setUser } = userSlice.actions;

export default userSlice.reducer;
