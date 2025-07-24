import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dbService from '../../appwrite/databaseService';

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, { rejectWithValue }) => {
    try {
      return await dbService.createOrder(orderData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId, { rejectWithValue }) => {
    try {
      return await dbService.getUserOrders(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.documents;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      });
  },
});

export default ordersSlice.reducer;