import React, { useState } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { motion as Motion } from 'framer-motion'
import {
  addWishlistItem,
  removeWishlistItem,
} from '../../redux/slices/wishlistSlice'
import { addCartItem } from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify'
import config from '../../config/config'
import Button from '../common/Button'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth)
  const { items: wishlistItems } = useSelector((state) => state.wishlist)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { items: cartItems } = useSelector((state) => state.cart)
  const isInCart = cartItems.some(item => item.productId?.$id === product?.$id)

  const isInWishlist = wishlistItems.some(
    (item) => item.productId.$id === product.$id
  )

  const formatText = (text) => {
    if (!text) return ''
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const formatPrice = (priceInCents) => {
    const maxPrice = 999999
    const normalizedPrice = Math.min(Math.abs(priceInCents), maxPrice)
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(normalizedPrice / 100)
  }

  const getImageUrl = () => {
    if (!product.image) return null
    if (product.image.startsWith('http')) return product.image
    if (product.image && config.appwriteBucketId) {
      return `${config.appwriteEndpoint}/storage/buckets/${config.appwriteBucketId}/files/${product.image}/view?project=${'68511b72003015a60ac5'}`
    }
    return null
  }

  const handleWishlistToggle = async () => {
    if (!userData) {
      toast.warning('Please login to manage wishlist')
      return
    }

    try {
      if (isInWishlist) {
        const wishlistItem = wishlistItems.find(
          (item) => item.productId === product.$id
        )
        if (wishlistItem) {
          await dispatch(removeWishlistItem(wishlistItem.$id)).unwrap()
          toast.success('Removed from wishlist')
        }
      } else {
        await dispatch(
          addWishlistItem({
            userId: userData.$id,
            productId: product.$id,
          })
        ).unwrap()
        toast.success('Added to wishlist')
      }
    } catch (error) {
      toast.error('Failed to update wishlist')
      console.log('handleWishlistToggle error: ', error);
    }
  }

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
          productId: product.$id,
          quantity: 1,
        })
      ).unwrap()
      toast.success('Added to cart')
    } catch (error) {
      console.error(error)
      error.code === 409
        ? toast.error(`Product already added to cart`)
        : toast.error(`Failed to add to cart`)
    } finally {
      setIsAddingToCart(false)
      console.log('object');
    }
  }

  const imageUrl = getImageUrl()

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative group"
    >
      {/* Wishlist Button */}
      <Motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWishlistToggle}
        className={`absolute top-4 right-4 p-2.5 rounded-full z-10 backdrop-blur-sm
          ${
            isInWishlist
              ? 'bg-red-50 dark:bg-red-500/20 text-red-500 dark:text-red-400'
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-400 dark:text-gray-500'
          }
          transition-all duration-200 hover:shadow-md`}
      >
        <Motion.svg
          animate={isInWishlist ? { scale: [1, 1.2, 1] } : {}}
          className="w-5 h-5"
          fill={isInWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </Motion.svg>
      </Motion.button>

      {/* Product Image */}
      <Link to={`/product/${product.$id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          {imageUrl ? (
            <Motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              src={imageUrl}
              alt={formatText(product.name)}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.onerror = null
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">No Image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.$id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 line-clamp-1">
            {formatText(product.name)}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
          {product.category}
        </p>
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
            {formatText(product.description)}
          </p>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 border-t border-gray-100 dark:border-gray-700">
        <div className="flex gap-2">
          

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

          <Link to={`/product/${product.$id}`} className="flex-1">
            <Button
              variant="primary"
              size="sm"
              className="w-full transition-all duration-200 group hover:shadow-md dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              <Motion.span 
                className="flex items-center justify-center"
                whileHover={{ x: 5 }}
              >
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Motion.span>
            </Button>
          </Link>
        </div>
      </div>
    </Motion.div>
  )
}

export default ProductCard