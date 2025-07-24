import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dbService from '../../appwrite/databaseService';

export const fetchWishlistItems = createAsyncThunk(
  'wishlist/fetchItems',
  async (userId, { rejectWithValue }) => {
    try {
      return await dbService.getWishlistItems(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addWishlistItem = createAsyncThunk(
  'wishlist/addItem',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      return await dbService.addToWishlist({ userId, productId });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeWishlistItem = createAsyncThunk(
  'wishlist/removeItem',
  async (wishlistItemId, { rejectWithValue }) => {
    try {
      await dbService.removeFromWishlist(wishlistItemId);
      return wishlistItemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.documents;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.$id !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;