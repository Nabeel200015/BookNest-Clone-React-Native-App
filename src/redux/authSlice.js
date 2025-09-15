import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';
import { saveToken, getToken, removeToken } from '../utils/storage';

//Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const response = await booknest.post('/users/login', data);
      const { token, user } = response.data;

      console.log('Login User:', response.data);

      //save token
      await saveToken(token);

      return { token, user };
    } catch (error) {
      console.log('API Error:', error.response?.data?.message);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login Failed',
      );
    }
  },
);

// LogoutThunk
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await removeToken();
  return null;
});

// ✅ Load User from Token (auto-login)
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, thunkAPI) => {
    try {
      const token = await getToken();
      if (!token) return thunkAPI.rejectWithValue('No token');

      console.log('Token:', token);

      const res = await booknest.get('/users/getuser'); // token auto-attached by interceptor
      console.log('Load User API RES:', res.data.data);

      return { token, user: res.data.data };
    } catch (error) {
      console.log('API Error:', error.response?.data?.message);
      await removeToken();

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to load user',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      //Login
      .addCase(loginUser.pending, state => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null; // clear old error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Load User
      .addCase(loadUser.pending, state => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //logout
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
