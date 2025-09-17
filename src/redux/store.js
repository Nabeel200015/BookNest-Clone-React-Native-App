const { configureStore } = require('@reduxjs/toolkit');
import authReducer from '../redux/authSlice';
import bookReducer from '../redux/bookSlice';
import wishlistReducer from './wishlistSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
