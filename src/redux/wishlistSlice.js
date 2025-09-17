import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import booknest from '../services/api';

//fetch wishlist
export const getWishlist = createAsyncThunk(
  'book/getWishlist',
  async (_, thunkAPI) => {
    try {
      const response = await booknest.get('/books/getwishlist');
      console.log('Get Wishlist API:', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Get Wishlist API Error:',
        error.response?.data || error.message,
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

//add wishlist
export const addWishlist = createAsyncThunk(
  'book/addWishlist',
  async (id, thunkAPI) => {
    try {
      const response = await booknest.put(`/books/addwishlist/${id}`);

      console.log('Add Wishlist API:', response.data);

      thunkAPI.dispatch(getWishlist());

      return response.data;
    } catch (error) {
      console.log(
        'Add Wishlist API Error:',
        error.response?.data || error.message,
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
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
      //get wishlist
      .addCase(getWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlistBooks;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add wishlist
      .addCase(addWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
