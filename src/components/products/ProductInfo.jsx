// components/ProductView/ProductInfo.jsx
import { motion as Motion } from 'framer-motion'
import {
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'

const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  isInWishlist,
  handleWishlistToggle,
  isAddingToCart,
  handleAddToCart,
}) => {
  const { items: cartItems } = useSelector((state) => state.cart)
  const isInCart = cartItems.some(item => item.productId?.$id === product.$id)
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            {product.name}
          </Motion.h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            {product.brand}
          </p>
        </div>
        <Motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistToggle}
          className={`p-2 rounded-full ${
            isInWishlist
              ? 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
          }`}
        >
          <HeartIcon className="h-6 w-6" />
        </Motion.button>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, idx) => (
            <StarIcon
              key={idx}
              className={`h-5 w-5 ${
                idx < Math.floor(product.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-200 dark:text-gray-700'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-500 dark:text-gray-400">
          ({product.reviewCount} reviews)
        </span>
      </div>

      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
      >
        ₹{product.price / 100}
      </Motion.p>

      {/* Color Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Color
        </h3>
        <div className="flex space-x-3">
          {product.color ? product.colors.map((color) => (
            <Motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`h-8 w-8 rounded-full border-2 ${
                selectedColor === color
                  ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-indigo-400'
                  : ''
              }`}
              style={{ backgroundColor: color }}
            />
          )) : 'Multicolor'}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Size
        </h3>
        <div className="flex space-x-3">
          {product.size ? product.sizes.map((size) => (
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg border ${
                selectedSize === size
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white border-transparent'
                  : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-indigo-500 dark:hover:border-indigo-400'
              }`}
            >
              {size}
            </Motion.button>
          )) : 'Free Size'}
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex space-x-4 items-center">
        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700">
          <Motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            -
          </Motion.button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center bg-transparent text-gray-900 dark:text-white"
            min="1"
          />
          <Motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            +
          </Motion.button>
        </div>
        <Motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart || isInCart}
          className={`flex-1 py-3 px-6 rounded-md flex items-center justify-center space-x-2
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

export default ProductInfo
