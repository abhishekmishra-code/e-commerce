import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Query } from 'appwrite'
import dbService from '../../appwrite/databaseService'

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}) => {
    const queries = []
    if (filters.category)
      queries.push(Query.equal('category', filters.category))
    if (filters.limit) queries.push(Query.limit(filters.limit))

    return await dbService.getProducts(queries)
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    return await dbService.getProductById(productId)
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    featured: [],
    categories: [],
    currentProduct: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.documents;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
  }
})

export default productSlice.reducer
