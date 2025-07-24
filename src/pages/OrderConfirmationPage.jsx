import React from 'react';
import { useLocation, Link } from 'react-router';
import { 
  CheckCircleIcon, 
  TruckIcon, 
  ClipboardDocumentListIcon,
  CreditCardIcon 
} from '@heroicons/react/24/outline';
import { FaBox, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../components/common/Button';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Order Success Header */}
        <div className="text-center mb-12">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Order #{orderId}
          </p>
        </div>

        {/* Order Status Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Status
            </h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardDocumentListIcon className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Order Confirmed
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    We've received your order
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaBox className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Processing
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your order is being prepared
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TruckIcon className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Shipping
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estimated delivery in 3-5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Shipping Address
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    123 Main St, Apt 4B
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <CreditCardIcon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Payment Method
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Credit Card ending in 4242
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            as={Link}
            to="/orders"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            View Orders
          </Button>
          <Button
            as={Link}
            to="/"
            variant="primary"
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;