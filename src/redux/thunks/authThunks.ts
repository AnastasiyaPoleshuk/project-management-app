import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, deleteUser, loginUser, updateUser } from '../../api/apiService';
import { ICreateUser, ISinginUser } from '../../types/apiTypes';

export const fetchSignUp = createAsyncThunk(
  'auth/signUp',
  async (authData: ICreateUser, { rejectWithValue }) => {
    try {
      const response = await createUser(authData);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchSignIn = createAsyncThunk(
  'auth/signIn',
  async (authData: ISinginUser, { rejectWithValue }) => {
    try {
      const response = await loginUser(authData);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchUpdate = createAsyncThunk(
  'auth/update',
  async (
    authData: { userId: string; userData: ICreateUser; token: string },
    { rejectWithValue }
  ) => {
    try {
      const { userId, userData, token } = authData;
      const response = await updateUser(userId, userData, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchDelete = createAsyncThunk(
  'auth/delete',
  async ({ userId, token }: { userId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await deleteUser(userId, token);
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);
