import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const QuantitySelector = memo(
  ({ quantity, onChange, min = 1, max = 99, step = 1, className = '' }) => {
    const handleDecrease = () => {
      if (quantity > min) {
        onChange(quantity - step)
      }
    }

    const handleIncrease = () => {
      if (quantity < max) {
        onChange(quantity + step)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleIncrease()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleDecrease()
      }
    }

    const handleInputChange = (e) => {
      const value = parseInt(e.target.value, 10)

      if (isNaN(value)) return

      if (value < min) {
        onChange(min)
      } else if (value > max) {
        onChange(max)
      } else {
        onChange(value)
      }
    }

    return (
      <div
        className={`inline-flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-800 ${className}`}
        data-testid="quantity-selector"
        role="group"
        aria-label="Quantity selector"
      >
        <Button
          disabled={quantity <= min}
          aria-label="Decrease quantity"
          type="button"
          onClick={handleDecrease}
          variant="ghost"
          size="sm"
          className="px-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MinusIcon className="w-4 h-4" />
        </Button>

        <div className="relative">
          <input
            aria-label="Quantity"
            onKeyDown={handleKeyDown}
            type="number"
            value={quantity}
            min={min}
            max={max}
            step={step}
            onChange={handleInputChange}
            className="w-12 text-center outline-none px-1 py-1.5 border-x border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200 bg-transparent [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="sr-only">
            Current quantity is {quantity}, minimum is {min}, maximum is {max}
          </span>
        </div>

        <Button
          disabled={quantity >= max}
          aria-label="Increase quantity"
          type="button"
          onClick={handleIncrease}
          variant="ghost"
          size="sm"
          className="px-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    )
  }
)

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  className: PropTypes.string,
}

// Add display name for debugging
QuantitySelector.displayName = 'QuantitySelector'

export default QuantitySelector