import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';
import { getWishlist } from './wishlistSlice';

// // fetch books + wishlist + notifications
// export const getBooks = createAsyncThunk(
//   'book/getBooks',
//   async ({ params = {}, append = false }, thunkAPI) => {
//     try {
//       //fetch books
//       const query = new URLSearchParams(params).toString();
//       const response = await booknest.get(`/books/getbooks?${query}`);
//       console.log('Books Data:', response.data);

//       //fetch wishlist
//       const res = await booknest.get('/books/getwishlist');
//       const wishlist = res.data.wishlistBooks;
//       console.log('Wishlist:', wishlist);

//       //fetch notifications
//       const resNotify = await booknest.get('/books/notifications');
//       const notifications = resNotify.data.notifications;
//       console.log('Notification :', notifications);

//       return { ...response.data, append, wishlist, notifications };
//     } catch (error) {
//       console.log('API Error:', error.response?.data || error.message);
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// fetch books
export const getBooks = createAsyncThunk(
  'book/getBooks',
  async ({ params = {}, append = false }, thunkAPI) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await booknest.get(`/books/getbooks?${query}`);
      console.log('Get Books API:', response.data);

      //get wishlist
      thunkAPI.dispatch(getWishlist());

      return { ...response.data, append };
    } catch (error) {
      console.log(
        'Get Books API Error:',
        error.response?.data || error.message,
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//fetch my books
export const getMyBooks = createAsyncThunk(
  'book/getMyBooks',
  async (_, thunkAPI) => {
    try {
      const response = await booknest.get('/books/getmybooks');
      console.log('Get My Books API:', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Get My Books API Error:',
        error.response?.data || error.message,
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//fetch selected book
export const getSelectedBook = createAsyncThunk(
  'book/getSelectedBook',
  async (id, thunkAPI) => {
    try {
      const response = await booknest.get(`/books/selectedBook/${id}`);
      console.log('Selected Book API:', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Selected Book API Error:',
        error.response?.data || error.message,
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const booksSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    myBooks: [],
    selectedBook: {},
    moreBooks: [],
    currentPage: 1,
    totalPage: 1,
    totalBooks: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      //getBooks
      .addCase(getBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.append) {
          state.books = [...state.books, ...action.payload.books];
        } else {
          state.books = action.payload.books;
        }
        state.currentPage = action.payload.currentPage;
        state.totalPage = action.payload.totalPage;
        state.totalBooks = action.payload.totalBooks;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getMyBooks
      .addCase(getMyBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.myBooks = action.payload;
      })
      .addCase(getMyBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //selectedBook
      .addCase(getSelectedBook.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelectedBook.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload.selected;
        state.moreBooks = action.payload.moreBooks;
      })
      .addCase(getSelectedBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { toggleWishlist } = booksSlice.actions;
export default booksSlice.reducer;
