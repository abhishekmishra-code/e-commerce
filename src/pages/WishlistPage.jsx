// WishlistPage.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  HeartIcon,
  ShoppingBagIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import {
  fetchWishlistItems,
  removeWishlistItem,
} from '../redux/slices/wishlistSlice'
import WishlistItem from '../components/wishlist/WishlistItem'
import Button from '../components/common/Button'
import { toast } from 'react-toastify' // Assuming you're using react-hot-toast for notifications

const WishlistPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userData } = useSelector((state) => state.auth)
  const { items, status, error } = useSelector((state) => state.wishlist)

  useEffect(() => {
    if (userData) {
      dispatch(fetchWishlistItems(userData.$id))
    }
  }, [dispatch, userData])

  const handleRemoveItem = async (itemId) => {
    try {
      await dispatch(removeWishlistItem(itemId)).unwrap()
      toast.success('Item removed from wishlist')
    } catch (error) {
      toast.error(error.message || 'Failed to remove item')
    }
  }

  // Not logged in state
  if (!userData) {
    return (
      <div className="max-w-md mx-auto py-12 text-center dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Your Wishlist
        </h2>
        <p className="mb-6 dark:text-gray-300">
          Please sign in to view your wishlist
        </p>
        <Button
          onClick={() => navigate('/login')}
          variant="primary"
          className="flex items-center gap-2 mx-auto"
        >
          Sign In
        </Button>
      </div>
    )
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px] dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-blue-400"></div>
      </div>
    )
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] dark:bg-gray-900">
        <ExclamationCircleIcon className="w-12 h-12 text-red-500 dark:text-red-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2 dark:text-white">
          Error Loading Wishlist
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
          {error || 'Something went wrong while loading your wishlist'}
        </p>
        <Button
          onClick={() => dispatch(fetchWishlistItems(userData.$id))}
          variant="primary"
          className="flex items-center gap-2"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold dark:text-white">Your Wishlist</h1>
        {items?.length > 0 && (
          <Button
            variant="outline"
            onClick={() => navigate('/products')}
            className="flex items-center gap-2"
          >
            <ShoppingBagIcon className="w-5 h-5" />
            Continue Shopping
          </Button>
        )}
      </div>

      {/* Empty state */}
      {!items?.length ? (
        <div className="text-center py-12 dark:text-gray-300">
          <HeartIcon className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h2 className="text-xl mb-4 dark:text-white">
            Your wishlist is empty
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Save items you love by clicking the heart icon on any product
          </p>
          <Button
            onClick={() => navigate('/products')}
            variant="primary"
            className="flex items-center gap-2 mx-auto"
          >
            <ShoppingBagIcon className="w-5 h-5" />
            Browse Products
          </Button>
        </div>
      ) : (
        // Wishlist items grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <WishlistItem
              key={item.$id}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default WishlistPage
