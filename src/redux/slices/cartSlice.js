import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dbService from '../../appwrite/databaseService'

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, { rejectWithValue }) => {
    try {
      return await dbService.getCartItems(userId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addCartItem = createAsyncThunk(
  'cart/addItem',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      return await dbService.addToCart({ userId, productId, quantity })
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      return await dbService.updateCartItem(cartItemId, quantity)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (cartItemId, { rejectWithValue }) => {
    try {
      await dbService.removeFromCart(cartItemId)
      return cartItemId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    calculateTotals: (state) => {
      state.totalItems = state.items?.reduce((total, item) => {
        // console.log(item);
        return total + item.quantity
      }, 0)
      state.totalPrice = state.items?.reduce(
        (total, item) => total + (item.productId?.price || 0) * item.quantity,
        0
      )
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.documents
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.$id === action.payload.$id
        )
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.$id !== action.payload)
      })
  },
})

export const { calculateTotals, clearCart } = cartSlice.actions
export default cartSlice.reducer
