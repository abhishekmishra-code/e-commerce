import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductCard from "./ProductCard";
import { motion as Motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";

const ProductList = ({ products, category }) => {
  const dispatch = useDispatch();
  const { items: reduxProducts, status, error } = useSelector((state) => state.products);

  // Only fetch products if products prop is not provided
  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts({ category }));
    }
  }, [dispatch, category, products]);

  // Decide which products to display
  const displayProducts = products || reduxProducts;

  // Show loading/error states only when using Redux data
  if (!products && status === "loading") {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-500 dark:border-indigo-400"></div>
        <p className="mt-4 font-medium text-gray-600 dark:text-gray-300">
          Loading amazing products...
        </p>
      </div>
    );
  }

  if (!products && status === "failed") {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-red-50 p-8 dark:bg-red-900/20">
        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/40">
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
        <p className="mt-2 text-center text-red-600 dark:text-red-300">
          {error}
        </p>
      </div>
    );
  }

  // Empty State
  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
        <SparklesIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          No products found
        </h3>
        <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
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
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        </div>
      )}

      {/* Products Grid */}
      <Motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {displayProducts.map((product, index) => (
          <Motion.div
            key={product.$id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <ProductCard product={product} />
          </Motion.div>
        ))}
      </Motion.div>

      {/* Products Count */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Showing {displayProducts.length} {displayProducts.length === 1 ? "product" : "products"}
      </div>
    </div>
  );
};

export default ProductList;