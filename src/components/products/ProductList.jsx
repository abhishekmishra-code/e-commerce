import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productSlice'
import ProductCard from './ProductCard'
import { motion as Motion } from 'framer-motion' // For animations
import { SparklesIcon } from '@heroicons/react/24/outline'

const ProductList = ({ category, limit }) => {
  const dispatch = useDispatch()
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ category, limit }))
  }, [dispatch, category, limit])

  // Loading State
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">
          Loading amazing products...
        </p>
      </div>
    )
  }

  // Error State
  if (status === 'failed') {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-xl p-8">
        <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-3">
          <svg
            className="h-8 w-8 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-red-800 dark:text-red-200">
          Oops! Something went wrong
        </h3>
        <p className="mt-2 text-red-600 dark:text-red-300 text-center">{error}</p>
      </div>
    )
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
        <SparklesIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          No products found
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    )
  }

  // Product Grid
  return (
    <div className="space-y-8">
      {/* Category Title if provided */}
      {category && (
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {category}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>
      )}

      {/* Products Grid */}
      <Motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product, index) => (
          <Motion.div
            key={product.$id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </Motion.div>
        ))}
      </Motion.div>

      {/* Products Count */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        {limit && ` of ${limit}`}
      </div>
    </div>
  )
}

export default ProductList