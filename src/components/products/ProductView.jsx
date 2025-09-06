import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../redux/slices/cartSlice";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../../redux/slices/wishlistSlice";
import {
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import TabSection from "./TabSection";
import config from "../../config/config";

const ProductView = ({ currentProduct }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isInWishlist = wishlistItems.some(
    (item) => item.productId?.$id === currentProduct?.$id,
  );

  const handleWishlistToggle = async () => {
    if (!userData) {
      toast.warning("Please login to manage wishlist");
      return;
    }

    try {
      if (isInWishlist) {
        const wishlistItem = wishlistItems.find(
          (item) => item.productId.$id === currentProduct.$id,
        );
        console.log(wishlistItem);
        if (wishlistItem) {
          await dispatch(removeWishlistItem(wishlistItem.$id)).unwrap();
          toast.success("Removed from wishlist");
        }
      } else {
        await dispatch(
          addWishlistItem({
            userId: userData.$id,
            productId: currentProduct.$id,
          }),
        ).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.log("handleWishlistToggle error: ", error);
    }
  };

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
          productId: currentProduct.$id,
          quantity,
          color: selectedColor,
          size: selectedSize,
        }),
      ).unwrap();
      toast.success("Added to cart");
    } catch (error) {
      error.code === 409
        ? toast.error(`Product already in cart`)
        : toast.error(`Failed to add to cart`);
    } finally {
      setIsAddingToCart(false);
    }
  };
  console.log(currentProduct);
  if (currentProduct?.customAttributes) {
    
    console.log(JSON.parse(currentProduct?.customAttributes));
  }

  const product = {
    ...currentProduct,
    colors: ["black", "white", "navy", "gray"],
    sizes: ["S", "M", "L", "XL"],
    images: currentProduct?.images || [],

    // images: [
    //   currentProduct?.images[0],
    //   '/img/product-2.jpg',
    //   '/img/product-3.jpg',
    //   '/img/product-4.jpg'
    // ],
    specifications: currentProduct?.customAttributes ? JSON.parse(currentProduct?.customAttributes) : {},
    // specifications: {
    //   material: "100% Cotton",
    //   fit: "Regular",
    //   care: "Machine wash cold",
    //   origin: "Made in Portugal",
    // },
    rating: 4.5,
    reviewCount: 128,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-8 rounded-2xl bg-white p-6 shadow-xl md:grid-cols-2 dark:bg-gray-800"
        >
          {/* Image Gallery */}
          <ImageGallery
            images={product.images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Product Info */}
          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            isInWishlist={isInWishlist}
            handleWishlistToggle={handleWishlistToggle}
            isAddingToCart={isAddingToCart}
            handleAddToCart={handleAddToCart}
          />
        </Motion.div>

        {/* Tabs Section */}
        <TabSection
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default ProductView;
