import React from 'react'
import { Link } from 'react-router'
import Button from '../../common/Button'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              ElectroKitchen
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Premium electronics & kitchenware for modern homes
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              <Link to={'/admin/add-product'}>Shop</Link>
            </h4>
            <ul className="space-y-2">
              {[
                'Kitchen Appliances',
                'Home Electronics',
                'Cookware',
                'Small Appliances',
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                'Contact Us',
                'Shipping Policy',
                'Returns & Exchanges',
                'FAQ',
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/support/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Stay Updated
            </h4>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button
                type="submit"
                onClick={(e) => e.preventDefault()}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>
            © 2020-{new Date().getFullYear()} ElectroKitchen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}