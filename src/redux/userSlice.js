import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';

//get user
export const fetchUser = createAsyncThunk(
  'user/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await booknest.get('/users/getuser');
      console.log('Get User API:', response.data);
      return response.data;
    } catch (error) {
      console.log('Get User API Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      //getUser
      .addCase(fetchUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
