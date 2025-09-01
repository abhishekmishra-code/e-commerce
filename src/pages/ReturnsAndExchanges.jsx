import React from 'react';
import {
  ArrowPathIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  CurrencyRupeeIcon,
} from '@heroicons/react/24/outline';
import { FaBox, FaRecycle, FaShippingFast } from 'react-icons/fa';

export default function ReturnsAndExchanges() {
  const returnSteps = [
    {
      title: "Initiate Return",
      icon: ArrowPathIcon,
      description: "Log into your account and select the item you wish to return from your order history."
    },
    {
      title: "Package Item",
      icon: FaBox,
      description: "Pack the item securely in its original packaging with all tags and accessories."
    },
    {
      title: "Ship Return",
      icon: FaShippingFast,
      description: "Use our prepaid shipping label or schedule a pickup from your location."
    },
    {
      title: "Get Refund",
      icon: CurrencyRupeeIcon,
      description: "Receive your refund within 5-7 business days after we receive the return."
    }
  ];

  const eligibleItems = [
    "Unused appliances in original packaging",
    "Unopened kitchen accessories",
    "Defective or damaged items",
    "Wrong items received",
    "Items with manufacturing defects"
  ];

  const nonEligibleItems = [
    "Used or installed appliances",
    "Items without original packaging",
    "Customized or personalized items",
    "Items marked as non-returnable",
    "Consumable items"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="flex justify-center mb-4">
          <FaRecycle className="h-16 w-16 text-blue-600 dark:text-blue-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Returns & Exchanges
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We want you to be completely satisfied with your purchase. Learn about our hassle-free returns and exchanges process.
        </p>
      </div>

      {/* Return Policy Highlights */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: ClockIcon,
              title: "30-Day Returns",
              description: "Return any eligible item within 30 days of delivery"
            },
            {
              icon: ShieldCheckIcon,
              title: "Quality Guarantee",
              description: "All products are quality checked before shipping"
            },
            {
              icon: TruckIcon,
              title: "Free Returns",
              description: "Free return shipping on orders above ₹5,000"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700/40"
            >
              <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Return Process */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 flex items-center justify-center">
          <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-3" />
          Return Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {returnSteps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700/40"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
                  <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                </div>
                <span className="ml-4 text-2xl font-bold text-blue-600 dark:text-blue-500">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Eligible vs Non-Eligible Items */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Eligible Items */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8">
            <div className="flex items-center mb-6">
              <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-500 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Eligible for Return
              </h3>
            </div>
            <ul className="space-y-4">
              {eligibleItems.map((item, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Eligible Items */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8">
            <div className="flex items-center mb-6">
              <XCircleIcon className="h-8 w-8 text-red-600 dark:text-red-500 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Not Eligible for Return
              </h3>
            </div>
            <ul className="space-y-4">
              {nonEligibleItems.map((item, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 mr-2" />
            Important Information
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Refund Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Refunds are processed to the original payment method. UPI and net banking refunds typically take 3-5 business days, while card refunds may take 5-7 business days.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Exchange Process
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                For exchanges, initiate a return and place a new order for the desired item. This ensures faster processing and availability.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Damaged Items
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you receive a damaged item, please report it within 48 hours of delivery with clear photos of the damage.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Need Help with Returns?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our customer service team is here to assist you with the return process.
              </p>
              <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}