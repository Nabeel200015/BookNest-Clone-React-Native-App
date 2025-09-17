const { configureStore } = require('@reduxjs/toolkit');
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import wishlistReducer from './wishlistSlice';
import userReducer from './userSlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
