import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUpdateUser, IUser } from '../../types/apiTypes';
import getCookieToken from '../../utils/getCookieToken';
import { fetchDelete, fetchSignIn, fetchSignUp, fetchUpdate } from '../thunks/authThunks';
import authState from '../types/auth';

const cookieToken = getCookieToken();

const initialState: authState = {
  token: cookieToken,
  isAuth: Boolean(cookieToken),
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuth = false;
    },
    emptyError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      })
      .addCase(fetchUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdate.fulfilled, (state, action: PayloadAction<IUpdateUser>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      })
      .addCase(fetchDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDelete.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      });
  },
});

export default authSlice.reducer;
