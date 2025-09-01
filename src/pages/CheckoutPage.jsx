import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../redux/slices/ordersSlice'
import { clearCart } from '../redux/slices/cartSlice'
import { Link, useNavigate } from 'react-router'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import {
  BanknotesIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { FaPaypal } from 'react-icons/fa'
import config from '../config/config'
import dbService from '../appwrite/databaseService'

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)

  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    shippingAddress: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalPrice = items?.reduce((total, item) => {
    return total + (item.productId?.price || 0) * item.quantity
  }, 0)

  const getImageUrl = (product) => {
    if (!product.image) return null
    if (product.image.startsWith('http')) return product.image
    if (product.image && config.appwriteBucketId) {
      return `${config.appwriteEndpoint}/storage/buckets/${config.appwriteBucketId}/files/${product.image}/view?project=${config.appwriteProjectId}`
    }
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const currentDate = new Date().toISOString()

      // Create order details as a JSON string
      const orderDetailsString = JSON.stringify({
        items: items.map((item) => ({
          product_id: item.productId.$id,
          quantity: item.quantity,
          price: item.productId.price,
          name: item.productId.name, // Include product name for reference
        })),
        payment_method: formData.paymentMethod,
        customer_info: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      })  

      const orderData = {
        user_id: userData.$id,
        total_amount: Math.round(totalPrice), // Make sure it's an integer
        shipping_address: formData.shippingAddress,
        status: 'pending',
        created_at: currentDate,
        order_details: orderDetailsString, // Now it's a string
      }

      // Create the order
      const createdOrder = await dispatch(createOrder(orderData)).unwrap()

      // Clear cart items from backend
      await dbService.clearCartItems(userData.$id)

      // Clear cart items from Redux store
      dispatch(clearCart())

      // Navigate to confirmation page
      navigate('/order-confirmation', {
        state: {
          orderId: createdOrder.$id, // Use the actual order ID from Appwrite
          orderDetails: JSON.parse(orderDetailsString), // Parse back to object for display
        },
      })
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!userData) {
    return (
      <div className="max-w-md mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p className="mb-6">Please sign in to complete your purchase</p>
        <Button as={Link} to="/login" variant="primary">
          Sign In
        </Button>
      </div>
    )
  }

  // const imageUrl = getImageUrl()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
          <ShoppingBagIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>

        {!userData ? (
          <div className="max-w-md mx-auto py-12 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Sign in to Checkout
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Please sign in to complete your purchase
            </p>
            <Button as={Link} to="/login" variant="primary">
              Sign In
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-200">
              <div className="flex items-center gap-2 mb-6">
                <TruckIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Shipping Information
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                <Input
                  label="Shipping Address"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                <div className="pt-6 border-t dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCardIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handleChange}
                        className="mr-3 text-primary-600"
                      />
                      <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900 dark:text-white">
                        Credit Card
                      </span>
                    </label>

                    {formData.paymentMethod === 'credit-card' && (
                      <div className="space-y-4 ml-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Input
                          label="Card Number"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="dark:bg-gray-600 dark:border-gray-500"
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiry Date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                            className="dark:bg-gray-600 dark:border-gray-500"
                          />
                          <Input
                            label="CVV"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            required
                            className="dark:bg-gray-600 dark:border-gray-500"
                          />
                        </div>
                      </div>
                    )}

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                        className="mr-3 text-primary-600"
                      />
                      <FaPaypal className="h-5 w-5 text-[#003087] dark:text-[#0079C1] mr-2" />
                      <span className="text-gray-900 dark:text-white">
                        PayPal
                      </span>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="mr-3 text-primary-600"
                      />
                      <BanknotesIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900 dark:text-white">
                        Cash on Delivery
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-8"
                  loading={isSubmitting}
                  disabled={isSubmitting || items.length === 0}
                >
                  Place Order
                </Button>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit transition-all duration-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Order Summary
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.$id}
                    className="flex items-center justify-between py-4 border-b dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {item.productId?.image && (
                          <img
                            src={getImageUrl(item.productId)}
                            alt={item.productId.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.productId?.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.quantity} × ₹
                          {(item.productId?.price / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ₹
                      {(
                        ((item.productId?.price || 0) * item.quantity) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="space-y-3 pt-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{(totalPrice / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      ₹{(totalPrice / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
