const { configureStore } = require('@reduxjs/toolkit');
import authReducer from '../redux/authSlice';
import bookReducer from '../redux/bookSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
  },
});

export default store;
