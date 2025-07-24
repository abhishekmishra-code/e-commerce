import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import {
  ShoppingBagIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { FaBox } from 'react-icons/fa';
import Button from '../components/common/Button';
import config from '../config/config';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    case 'cancelled':
      return 'text-red-500 bg-red-50 dark:bg-red-900/20';
    case 'processing':
      return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    case 'pending':
      return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    default:
      return 'text-gray-500 bg-gray-50 dark:bg-gray-700';
  }
};

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return <CheckCircleIcon className="h-5 w-5" />;
    case 'cancelled':
      return <XCircleIcon className="h-5 w-5" />;
    case 'processing':
      return <ClockIcon className="h-5 w-5" />;
    case 'pending':
      return <TruckIcon className="h-5 w-5" />;
    default:
      return <FaBox className="h-5 w-5" />;
  }
};

const OrdersPage = () => {
  const { userData } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);

  const getImageUrl = (productId) => {
    const product = items.find((item) => (item.$id === productId))
    if (!product?.image) return null
    if (product?.image.startsWith('http')) return product?.image
    if (product?.image && config.appwriteBucketId) {
      return `${config.appwriteEndpoint}/storage/buckets/${config.appwriteBucketId}/files/${product.image}/view?project=${config.appwriteProjectId}`
    }
    return null
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to view orders
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Please sign in to view your order history
          </p>
          <Button as={Link} to="/login" variant="primary" className="mt-6">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Orders
          </h1>
          <Button
            as={Link}
            to="/"
            variant="outline"
            className="flex items-center gap-2"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            Continue Shopping
          </Button>
        </div>

        {orders?.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <FaBox className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              No orders yet
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Start shopping to create your first order
            </p>
            <Button as={Link} to="/" variant="primary" className="mt-6">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const orderDetails = JSON.parse(order.order_details);
              return (
                <div
                  key={order.$id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b dark:border-gray-700">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Order #{order.$id}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Placed on{' '}
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                        <Button
                          as={Link}
                          to={`/orders/${order.$id}`}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <EyeIcon className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {orderDetails.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-4 border-b last:border-0 dark:border-gray-700"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                              {item.product_id && (
                                <img
                                  src={getImageUrl(item.product_id)}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            ₹{((item.price * item.quantity) / 100).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-6 border-t dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="text-gray-600 dark:text-gray-400">
                          <p>Shipping Address:</p>
                          <p className="text-sm mt-1">
                            {order.shipping_address}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 dark:text-gray-400">
                            Total Amount
                          </p>
                          <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                            ₹{(order.total_amount / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;