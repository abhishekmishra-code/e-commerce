// CartItem.jsx
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { TrashIcon, PhotoIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Button from '../common/Button'
import QuantitySelector from '../common/QuantitySelector'
import { useSelector } from 'react-redux'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { items: productsList } = useSelector((state) => state.products);

  const [product] = productsList.filter(
    (product) => product.$id === item.productId,
  );

  const formatText = (text) => {
    if (!text) return ''
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const [ imageUrl ] = product.images

  if (!item || !item.productId) {
    return null
  }

  return (
    <div className="flex flex-col sm:flex-row p-4 gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
      <Link 
        to={`/product/${product.$id}`}
        className="flex-shrink-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden group cursor-pointer hover:ring-2 hover:ring-blue-500 dark:hover:ring-blue-400 transition-all duration-200"
        aria-label={`View ${formatText(product.name)} details`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={formatText(product.name)}
            className="object-contain w-full h-full transition-all duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">
            <PhotoIcon className="w-12 h-12 mb-2" />
            <span className="text-sm">No Image</span>
          </div>
        )}
      </Link>

      <div className="flex-grow max-w-1/2">
        <Link 
          to={`/product/${product.$id}`}
          className="group inline-block"
          aria-label={`View ${formatText(product.name)} details`}
        >
          <h3 className="font-medium text-lg text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {formatText(product.name) || 'Product'}
          </h3>
        </Link>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
          {formatText(product.category) || 'Category'}
        </p>
        
        <p className="font-bold text-gray-800 dark:text-white mb-2">
          ₹{product?.price 
              ? (product.price).toFixed(2)
              : '0.00'
           }
        </p>

        {!!product?.isShippable && (
          <div className="flex items-center text-red-600 dark:text-red-500 text-sm mb-1" role="alert">
            <ExclamationCircleIcon className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>This item cannot be shipped to your location</span>
          </div>
        )}

        {product?.stock < 5 && (
          <div className="flex items-center text-amber-600 dark:text-amber-500 text-sm" role="alert">
            <ExclamationCircleIcon className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>Only {product.stock} left in stock</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <QuantitySelector
          quantity={item.quantity}
          onChange={(newQuantity) => onUpdateQuantity(item.$id, newQuantity)}
          min={1}
          max={product?.stock || 10}
          className="dark:border-gray-600"
        />

        <Button
          variant="danger-outline"
          size="sm"
          onClick={() => onRemove(item.$id)}
          className="w-full sm:w-auto group"
          aria-label={`Remove ${formatText(product.name)} from cart`}
        >
          <TrashIcon className="w-5 h-5 mr-2 inline-block group-hover:text-red-600 transition-colors" />
          Remove
        </Button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    $id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    productId: PropTypes.shape({
      $id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      price: PropTypes.number,
      stock: PropTypes.number,
      image: PropTypes.string,
      isShippable: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default React.memo(CartItem)