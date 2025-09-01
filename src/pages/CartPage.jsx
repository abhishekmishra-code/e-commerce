// CartPage.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingBagIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  calculateTotals,
} from '../redux/slices/cartSlice'
import CartItem from '../components/cart/CartItem'
import Button from '../components/common/Button'
import { Link } from 'react-router'

const CartPage = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth)
  const { items, status } = useSelector((state) => state.cart)

  const totalItems = items?.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const totalPrice = items?.reduce((total, item) => {
    return total + (item.productId?.price || 0) * item.quantity
  }, 0)

  useEffect(() => {
    if (userData) {
      dispatch(fetchCartItems(userData.$id))
    }
  }, [dispatch, userData])

  useEffect(() => {
    dispatch(calculateTotals())
  }, [items, dispatch])

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ cartItemId: itemId, quantity: newQuantity }))
    } else {
      dispatch(removeCartItem(itemId))
    }
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId))
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center text-red-600 dark:text-red-500 min-h-[400px]">
        <ExclamationCircleIcon className="w-6 h-6 mr-2" />
        Error loading cart items
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="max-w-md mx-auto py-12 text-center dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Your Shopping Cart</h2>
        <p className="mb-6 dark:text-gray-300">Please sign in to view your cart</p>
        <Button as={Link} to="/login" variant="primary">
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Your Shopping Cart</h1>

      {items && items.length === 0 ? (
        <div className="text-center py-12 dark:text-gray-300">
          <ShoppingBagIcon className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h2 className="text-xl mb-4">Your cart is empty</h2>
          <Button as={Link} to="/products" variant="primary">
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
              {items?.map((item) => (
                <CartItem
                  key={item.$id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit transition-colors duration-200">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between dark:text-gray-300">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium">₹{(totalPrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between dark:text-gray-300">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between border-t dark:border-gray-700 pt-4">
                <span className="font-bold dark:text-white">Total</span>
                <span className="font-bold text-lg dark:text-white">
                  ₹{(totalPrice / 100).toFixed(2)}
                </span>
              </div>
            </div>

            <Button as={Link} to="/checkout" variant="primary" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage