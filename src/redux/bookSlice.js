import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';

// fetch books + wishlist + notifications
export const getBooks = createAsyncThunk(
  'book/getBooks',
  async ({ params = {}, append = false }, thunkAPI) => {
    try {
      //fetch books
      const query = new URLSearchParams(params).toString();
      const response = await booknest.get(`/books/getbooks?${query}`);
      console.log('Books Data:', response.data);

      //fetch wishlist
      const res = await booknest.get('/books/getwishlist');
      const wishlist = res.data.wishlistBooks;
      console.log('Wishlist:', wishlist);

      //fetch notifications
      const resNotify = await booknest.get('/books/notifications');
      const notifications = resNotify.data.notifications;
      console.log('Notification :', notifications);

      return { ...response.data, append, wishlist, notifications };
    } catch (error) {
      console.log('API Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const booksSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    wishlist: [],
    notifications: [],
    currentPage: 1,
    totalPage: 1,
    totalBooks: 0,
    loading: false,
    error: null,
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const book = action.payload;
      const wishlist = state.wishlist || [];

      const exist = wishlist.find(b => b._id === book._id);
      if (exist) {
        // remove book if already exists
        const filterWishList = wishlist.filter(b => b._id !== book._id); // filtered wishlist

        state.wishlist = filterWishList; //update wishlist with filter wishlist
        console.log('Removed from wishlist:', book._id);
      } else {
        state.wishlist.push(book); // add book to wishlist
        console.log('Added to wishlist:', book._id);
      }
    },
  },
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
          // append books for infinite scroll
          state.books = [...state.books, ...action.payload.books];
        } else {
          // fresh load
          state.books = action.payload.books;
        }
        state.wishlist = action.payload.wishlist || [];
        state.notifications = action.payload.notifications || [];
        state.currentPage = action.payload.currentPage;
        state.totalPage = action.payload.totalPages;
        state.totalBooks = action.payload.totalBooks;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { toggleWishlist } = booksSlice.actions;
export default booksSlice.reducer;
