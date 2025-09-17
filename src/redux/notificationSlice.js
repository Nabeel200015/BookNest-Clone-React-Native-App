import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';
//fetch Notifications
export const getNotifications = createAsyncThunk(
  'book/getNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await booknest.get('/books/notifications');
      console.log('Get Notifications API:', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Get Notifications API Error:',
        error.response?.data || error.message,
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getNotifications.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
