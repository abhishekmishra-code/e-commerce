// CartPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingBagIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  calculateTotals,
} from "../redux/slices/cartSlice";
import CartItem from "../components/cart/CartItem";
import Button from "../components/common/Button";
import { Link } from "react-router";

const CartPage = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { items: productsList } = useSelector((state) => state.products);
  const { items, status } = useSelector((state) => state.cart);

  const CartProductsList = items.map((item) => {
    return {
      ...productsList.find((product) => product.$id === item.productId),
      quantity: item.quantity,
    };
  });

  const totalItems = CartProductsList?.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = CartProductsList?.reduce((total, item) => {
    return total + (item.price || 0) * item.quantity;
  }, 0);

  useEffect(() => {
    if (userData) {
      dispatch(fetchCartItems(userData.$id));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ cartItemId: itemId, quantity: newQuantity }));
    } else {
      dispatch(removeCartItem(itemId));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-red-600 dark:text-red-500">
        <ExclamationCircleIcon className="mr-2 h-6 w-6" />
        Error loading cart items
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="mx-auto max-w-md py-12 text-center dark:bg-gray-900">
        <h2 className="mb-4 text-2xl font-bold dark:text-white">
          Your Shopping Cart
        </h2>
        <p className="mb-6 dark:text-gray-300">
          Please sign in to view your cart
        </p>
        <Button as={Link} to="/login" variant="primary">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 transition-colors duration-200 dark:bg-gray-900">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">
        Your Shopping Cart
      </h1>

      {items && items.length === 0 ? (
        <div className="py-12 text-center dark:text-gray-300">
          <ShoppingBagIcon className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
          <h2 className="mb-4 text-xl">Your cart is empty</h2>
          <Button as={Link} to="/products" variant="primary">
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-md transition-colors duration-200 dark:divide-gray-700 dark:bg-gray-800">
              {items?.map((item) => (
                <CartItem
                  key={item.$id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          </div>

          <div className="h-fit rounded-lg bg-white p-6 shadow-md transition-colors duration-200 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold dark:text-white">
              Order Summary
            </h2>
            <div className="mb-6 space-y-4">
              <div className="flex justify-between dark:text-gray-300">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between dark:text-gray-300">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between border-t pt-4 dark:border-gray-700">
                <span className="font-bold dark:text-white">Total</span>
                <span className="text-lg font-bold dark:text-white">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              as={Link}
              to="/checkout"
              variant="primary"
              className="w-full"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
