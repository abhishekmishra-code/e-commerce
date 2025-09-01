import React from 'react';
import {
  TruckIcon,
  GlobeAmericasIcon,
  ClockIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { FaBox, FaShippingFast, FaMapMarkedAlt } from 'react-icons/fa';

export default function ShippingPolicy() {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      icon: TruckIcon,
      time: '3-5 business days',
      cost: 'Free on orders over ₹5000',
      details: 'Available for all domestic orders within India'
    },
    {
      name: 'Express Shipping',
      icon: FaShippingFast,
      time: '1-2 business days',
      cost: '₹199',
      details: 'Guaranteed delivery within 2 business days'
    },
    {
      name: 'International Shipping',
      icon: GlobeAmericasIcon,
      time: '7-14 business days',
      cost: 'Varies by location',
      details: 'Available for select international destinations'
    }
  ];

  const policies = [
    {
      title: 'Processing Time',
      icon: ClockIcon,
      content: 'Orders are typically processed within 1-2 business days after payment confirmation.'
    },
    {
      title: 'Shipping Insurance',
      icon: ShieldCheckIcon,
      content: 'All orders over ₹10,000 include complimentary shipping insurance.'
    },
    {
      title: 'Tracking Information',
      icon: MapPinIcon,
      content: 'Tracking details will be sent via SMS and email once your order ships.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="flex justify-center mb-4">
          <FaBox className="h-16 w-16 text-blue-600 dark:text-blue-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Shipping Policy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We ensure reliable and efficient delivery of your kitchen essentials across India.
        </p>
      </div>

      {/* Shipping Methods */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 flex items-center justify-center">
          <TruckIcon className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-3" />
          Shipping Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shippingMethods.map((method, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700/40"
            >
              <div className="flex items-center mb-6">
                <method.icon className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {method.name}
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <p className="text-gray-600 dark:text-gray-300">{method.time}</p>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <p className="text-gray-600 dark:text-gray-300">{method.cost}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{method.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Policies */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 flex items-center justify-center">
          <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-3" />
          Shipping Policies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700/40"
            >
              <div className="flex items-center mb-6">
                <policy.icon className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {policy.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{policy.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 mr-2" />
            Important Information
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Festival Season Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                During Diwali, Dussehra, and other festival seasons, shipping times may be extended. Please order early to ensure timely delivery.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                International Duties & Taxes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                International customers are responsible for any customs duties, taxes, and import fees imposed by their country.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Shipping Restrictions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Some items may have shipping restrictions to certain locations. We'll notify you during checkout if any restrictions apply.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our customer service team is available to assist you with any shipping-related questions.
              </p>
              <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                <FaMapMarkedAlt className="h-5 w-5 mr-2" />
                Track Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}