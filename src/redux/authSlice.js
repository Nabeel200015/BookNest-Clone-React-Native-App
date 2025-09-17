import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';
import {
  saveToken,
  getToken,
  removeToken,
  saveUser,
  removeUser,
} from '../utils/storage';
import Toast from 'react-native-toast-message';
import theme from '../constants/theme';

// //Login thunk
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (data, thunkAPI) => {
//     try {
//       const response = await booknest.post('/users/login', data);
//       const { token, user } = response.data;

//       console.log('Login User:', response.data);

//       //save token
//       await saveToken(token);

//       return { token, user };
//     } catch (error) {
//       console.log('API Error:', error);

//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 'Login Failed',
//       );
//     }
//   },
// );
//Login thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await booknest.post('/users/login', formData);
      console.log('Login API :', response);
      const { token, user } = response.data;

      //save token and user to AsyncStorage
      await saveToken(token);
      await saveUser(JSON.stringify(user));
      // console.log('Login User:', JSON.stringify(user));
      // console.log('Token:', token);

      return { token, user };
    } catch (error) {
      console.log('Login API Error:', error.response?.data?.message || error);
      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to Login..',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login Failed',
      );
    }
  },
);

//Send verficaion email thunk
export const sendVerificationEmail = createAsyncThunk(
  'auth/sendVerificationEmail',
  async (userEmail, thunkAPI) => {
    try {
      const response = await booknest.post('/users/sendvarification', {
        email: userEmail,
      });
      console.log('Verification Email API:', response);

      Toast.show({
        position: 'top',
        type: 'success',
        text1: `✅ ${response.data?.message}!`,
        text1Style: { color: theme.colors.success },
      });

      return response.data;
    } catch (error) {
      console.log(
        'Verification Email API Error:',
        error.response?.data?.message || error,
      );

      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to send verification email..',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Verification Failed',
      );
    }
  },
);

//Register thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await booknest.post('/users/register', formData);
      console.log('Register API ', response);

      return response.data;
    } catch (error) {
      console.log(
        'Register API Error:',
        error.response?.data?.message || error,
      );

      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to Register..',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Register Failed',
      );
    }
  },
);

//Send Otp thunk
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (email, thunkAPI) => {
    try {
      const response = await booknest.post('/users/sendotp', { email: email });
      console.log('Send Otp API :', response);
      return response.data;
    } catch (error) {
      console.log(
        'Send Otp API Error:',
        error.response?.data?.message || error,
      );
      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to Send Otp..',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Send Otp Failed',
      );
    }
  },
);

//Verify Otp thunk
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await booknest.post('/users/verifyotp', { email, otp });
      console.log('Verify Otp API :', response);
      return response.data;
    } catch (error) {
      console.log(
        'Verify Otp API Error:',
        error.response?.data?.message || error,
      );
      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to Verify Otp..',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Verify Otp Failed',
      );
    }
  },
);

//Reset password thunk
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await booknest.post('/users/resetpassword', {
        email,
        newPassword: password,
      });
      console.log('Reset Password API :', response);
      return response.data;
    } catch (error) {
      console.log(
        'Reset Password API Error:',
        error.response?.data?.message || error,
      );
      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to Reset Password..',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Reset Password Failed',
      );
    }
  },
);

// LogoutThunk
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await removeToken();
  await removeUser();
  return null;
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      //Login
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Send email verification
      .addCase(sendVerificationEmail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Register
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
        // state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Send Otp
      .addCase(sendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Verify Otp
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Reset Password
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
