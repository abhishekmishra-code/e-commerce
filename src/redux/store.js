import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/wishlistSlice'
import ordersReducer from './slices/ordersSlice'
import storageReducer from './slices/storageSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
    storage: storageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
