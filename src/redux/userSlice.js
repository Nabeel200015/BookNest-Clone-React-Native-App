import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';
import Toast from 'react-native-toast-message';
import theme from '../constants/theme';
import { getWishlist } from './wishlistSlice';
import { getNotifications } from './notificationSlice';
import { getBookRequests, getMyBooks } from './bookSlice';

//get user
export const fetchUser = createAsyncThunk(
  'user/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await booknest.get('/users/getuser');
      console.log('Get User API:', response.data);

      //get wishlist
      thunkAPI.dispatch(getWishlist());

      //get notifications
      thunkAPI.dispatch(getNotifications());

      //get Book requests
      thunkAPI.dispatch(getBookRequests());

      //get user books
      thunkAPI.dispatch(getMyBooks());

      return response.data;
    } catch (error) {
      console.log('Get User API Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//update profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData, thunkAPI) => {
    try {
      const response = await booknest.put('/users/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      thunkAPI.dispatch(fetchUser());
      Toast.show({
        position: 'top',
        type: 'success',
        text1: '✅ Profile updated successfully!',
        text1Style: { color: theme.colors.success },
      });
      console.log('Update Profile API:', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Update Profile API Error:',
        error.response?.data || error.message,
      );
      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to update profile',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//change password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ currentPass, newPass }, thunkAPI) => {
    try {
      const response = await booknest.post('/users/change-password', {
        oldPassword: currentPass,
        newPassword: newPass,
      });
      Toast.show({
        position: 'top',
        type: 'success',
        text1: '✅ Password changed successfully!',
        text1Style: { color: theme.colors.success },
      });
      console.log('Change Password API:', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Change Password API Error:',
        error.response?.data || error.message,
      );
      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to change password',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });
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
      })

      //updateProfile
      .addCase(updateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //changePassword
      .addCase(changePassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
