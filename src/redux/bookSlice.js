import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';
import Toast from 'react-native-toast-message';
import theme from '../constants/theme';
import { fetchUser } from './userSlice';

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

      //get User
      thunkAPI.dispatch(fetchUser());

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

//request bid
export const requestBid = createAsyncThunk(
  'book/requestBid',
  async ({ bookId, amount }, thunkAPI) => {
    try {
      const response = await booknest.post(`/books/requestbid/${bookId}`, {
        amount: amount,
      });
      console.log('Request Bid API:', response.data);

      thunkAPI.dispatch(getBookRequests());
      Toast.show({
        position: 'top',
        type: 'success',
        text1: '✅ Bid sent successfully!',
        text1Style: { color: theme.colors.success },
        text2: `Bid Amount: Rs ${amount}`,
      });

      return response.data;
    } catch (error) {
      console.log(
        'Request Bid API Error:',
        error.response?.data || error.message,
      );

      Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to send bid..',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message || error.message,
      });
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//get book requests
export const getBookRequests = createAsyncThunk(
  'book/getBookRequests',
  async (_, thunkAPI) => {
    try {
      const response = await booknest.get('/books/getrequests');
      console.log('Get Book Requests API:', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Get Book Requests API Error:',
        error.response?.data || error.message,
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//search Books
export const searchBook = createAsyncThunk(
  'book/searchBook',
  async ({ query, category }, thunkAPI) => {
    try {
      const response = await booknest.get('/books/searchbook', {
        params: {
          title: query,
          genre: category === 'All' ? '' : category,
        },
      });
      console.log('Search Book API:', response.data);

      return response.data;
    } catch (error) {
      console.log(
        'Search Book API Error:',
        error.response?.data || error.message,
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//add book
export const addBook = createAsyncThunk(
  'book/addBook',
  async (formData, thunkAPI) => {
    try {
      const response = await booknest.post('/books/addbook', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      thunkAPI.dispatch(getMyBooks());

      Toast.show({
        position: 'top',
        type: 'success',
        text1: '✅ Book Added successfully!',
        text1Style: { color: theme.colors.success },
      });

      console.log('Add Book API:', response.data);
      return response.data;
    } catch (error) {
      console.log('Add Book API Error:', error.response?.data || error.message);
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
    searchBooks: [],
    receivedRequests: [],
    sentRequests: [],
    searchLoading: false,
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
      })

      //search books
      .addCase(searchBook.pending, state => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchBook.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchBooks = action.payload;
      })
      .addCase(searchBook.rejected, state => {
        state.searchLoading = false;
      })

      //add book
      .addCase(addBook.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get book requests
      .addCase(getBookRequests.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedRequests = action.payload.receivedRequests;
        state.sentRequests = action.payload.sentRequests;
      })
      .addCase(getBookRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;
