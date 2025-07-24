// components/ProductView/TabSection.jsx
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { StarIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const TabSection = ({ product }) => {
  // Sample reviews data
  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2024-03-15",
      comment: "Excellent quality and perfect fit. Highly recommended!"
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      date: "2024-03-10",
      comment: "Good product, but shipping took longer than expected."
    },
    // Add more reviews as needed
  ]

  return (
    <>
      {/* Mobile Tabs */}
      {/* <div className="mt-8 md:hidden">
        <TabView product={product} reviews={reviews} />
      </div> */}

      {/* Desktop Full Content */}
      <div className="block mt-16 space-y-12">
        {/* Description Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Product Description
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Specifications
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div 
                key={key} 
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 transform hover:scale-105 transition-transform duration-200"
              >
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </dt>
                <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Reviews Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Customer Reviews
            </h2>
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
              <span className="text-gray-600 dark:text-gray-300">
                Based on {product.reviewCount} reviews
              </span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <Motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <UserCircleIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {review.user}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-200 dark:text-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {review.comment}
                </p>
              </Motion.div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="mt-8 text-center">
            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-800"
            >
              Write a Review
            </Motion.button>
          </div>
        </section>

        {/* Shipping Information Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Shipping Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delivery Options
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Standard Delivery (3-5 business days)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Express Delivery (1-2 business days)</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Return Policy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer a 30-day return policy for all unused items in their original packaging. 
                Return shipping is free for domestic orders.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

// Mobile Tab View Component
const TabView = () => {
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 whitespace-nowrap rounded-lg transition-colors duration-200
              ${activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="pt-4"
        >
          {/* Content based on active tab */}
          {/* Add your mobile tab content here */}
        </Motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TabSection