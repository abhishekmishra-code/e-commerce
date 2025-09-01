import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { XCircleIcon, PhotoIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Button from '../common/Button'
import config from '../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import {motion as Motion} from 'framer-motion'
import { addCartItem } from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify'

const WishlistItem = ({ item, onRemove }) => {
  const {userData} = useSelector(state => state.auth)
  const { items: cartItems } = useSelector((state) => state.cart)
  const isInCart = cartItems.some(cartItem => cartItem.productId?.$id === item?.$id)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const dispatch = useDispatch()

  const handleAddToCart = async () => {
    if (!userData) {
      toast.warning('Please login to add items to cart')
      return
    }

    try {
      setIsAddingToCart(true)
      await dispatch(
        addCartItem({
          userId: userData.$id,
          productId: item.productId.$id,
          quantity: 1,
        })
      ).unwrap()
      toast.success('Added to cart')
    } catch (error) {
      error.code === 409
        ? toast.error(`Product already added to cart`)
        : toast.error(`Failed to add to cart`)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const formatText = (text) => {
    if (!text) return ''
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const getImageUrl = () => {
    if (!item?.productId?.image) return null

    if (item.productId.image.startsWith('http')) {
      return item.productId.image
    }

    if (item.productId.image && config.appwriteBucketId) {
      return `${config.appwriteEndpoint}/storage/buckets/${config.appwriteBucketId}/files/${item.productId.image}/view?project=${config.appwriteProjectId}`
    }

    return null
  }

  const imageUrl = getImageUrl()

  if (!item || !item.productId) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group transition-all duration-200 hover:shadow-lg">
      <div className="relative">
        <Link 
          to={`/product/${item.productId.$id}`}
          className="block aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={formatText(item.productId.name)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
              <PhotoIcon className="w-12 h-12 mb-2" />
              <span className="text-sm">No Image</span>
            </div>
          )}
        </Link>

        <button
          onClick={() => onRemove(item.$id)}
          className="absolute top-2 right-2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
          aria-label={`Remove ${formatText(item.productId.name)} from wishlist`}
        >
          <XCircleIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <Link 
          to={`/product/${item.productId.$id}`}
          className="block group"
        >
          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-1 truncate">
            {formatText(item.productId.name)}
          </h3>
        </Link>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          {formatText(item.productId.category)}
        </p>

        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{item.productId?.price ? (item.productId.price / 100).toFixed(2) : '0.00'}
          </p>
          {item.productId?.stock > 0 ? (
            <span className="text-sm text-green-600 dark:text-green-400">In Stock</span>
          ) : (
            <span className="text-sm text-red-600 dark:text-red-400">Out of Stock</span>
          )}
        </div>

        {/* <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => onAddToCart(item.productId)}
          disabled={!item.productId?.stock}
        >
          <ShoppingCartIcon className="w-5 h-5 mr-2" />
          Add to Cart
        </Button> */}
        <Motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart || isInCart}
          className={`flex-1 px-1 cursor-pointer  rounded-md flex items-center justify-center space-x-2
    ${
      isInCart
        ? 'bg-green-600 hover:bg-green-700'
        : isAddingToCart
        ? 'bg-gray-400'
        : 'bg-indigo-600 hover:bg-indigo-700'
    } text-white`}
        >
          <ShoppingCartIcon className="h-5 w-5" />
          <span>
            {isInCart
              ? 'In Cart'
              : isAddingToCart
              ? 'Adding...'
              : 'Add to Cart'}
          </span>
        </Motion.button>
      </div>
    </div>
  )
}

WishlistItem.propTypes = {
  item: PropTypes.shape({
    $id: PropTypes.string.isRequired,
    productId: PropTypes.shape({
      $id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      price: PropTypes.number,
      stock: PropTypes.number,
      image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default React.memo(WishlistItem)