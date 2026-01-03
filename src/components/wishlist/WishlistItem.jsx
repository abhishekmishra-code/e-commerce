import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import {
  XCircleIcon,
  PhotoIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { motion as Motion } from "framer-motion";
import { addCartItem } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const WishlistItem = ({ item, onRemove }) => {
  const { userData } = useSelector((state) => state.auth);
  const { items: productsList } = useSelector((state) => state.products);
  const { items: cartItems } = useSelector((state) => state.cart);
  const isInCart = cartItems.some(
    (cartItem) => cartItem.productId === item?.$id,
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useDispatch();

  const [product] = productsList.filter(
    (product) => product.$id === item.productId,
  );

  const handleAddToCart = async () => {
    if (!userData) {
      toast.warning("Please login to add items to cart");
      return;
    }

    try {
      setIsAddingToCart(true);
      await dispatch(
        addCartItem({
          userId: userData.$id,
          productId: product.$id,
          quantity: 1,
        }),
      ).unwrap();
      toast.success("Added to cart");
    } catch (error) {
      error.code === 409
        ? toast.error(`Product already added to cart`)
        : toast.error(`Failed to add to cart`);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatText = (text) => {
    if (!text) return "";
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const [ imageUrl ] = product.images;

  if (!item || !item.productId) {
    return null;
  }

  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:shadow-lg dark:bg-gray-800">
      <div className="relative">
        <Link
          to={`/product/${product.$id}`}
          className="block aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={formatText(product.name)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-400 dark:text-gray-500">
              <PhotoIcon className="mb-2 h-12 w-12" />
              <span className="text-sm">No Image</span>
            </div>
          )}
        </Link>

        <button
          onClick={() => onRemove(item.$id)}
          className="absolute top-2 right-2 z-10 rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          aria-label={`Remove ${formatText(product.name)} from wishlist`}
        >
          <XCircleIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.$id}`} className="group block">
          <h3 className="mb-1 truncate font-medium text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {formatText(product.name)}
          </h3>
        </Link>

        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          {formatText(product.category)}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ₹
            {product?.price
              ? (product.price).toFixed()
              : "0.00"}
          </p>
          {product?.stock > 0 ? (
            <span className="text-sm text-green-600 dark:text-green-400">
              In Stock
            </span>
          ) : (
            <span className="text-sm text-red-600 dark:text-red-400">
              Out of Stock
            </span>
          )}
        </div>

        {/* <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => onAddToCart(product)}
          disabled={!product?.stock}
        >
          <ShoppingCartIcon className="w-5 h-5 mr-2" />
          Add to Cart
        </Button> */}
        <Motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart || isInCart}
          className={`flex flex-1 cursor-pointer items-center justify-center space-x-2 rounded-md px-1 ${
            isInCart
              ? "bg-green-600 hover:bg-green-700"
              : isAddingToCart
                ? "bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
          } text-white`}
        >
          <ShoppingCartIcon className="h-5 w-5" />
          <span>
            {isInCart
              ? "In Cart"
              : isAddingToCart
                ? "Adding..."
                : "Add to Cart"}
          </span>
        </Motion.button>
      </div>
    </div>
  );
};

WishlistItem.propTypes = {
  item: PropTypes.shape({
    $id: PropTypes.string.isRequired,
    productId: PropTypes.shape({
      $id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      price: PropTypes.number,
      stock: PropTypes.number,
      image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(WishlistItem);
