const config = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteProductsCollectionId: String(import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID),
  appwriteCartCollectionId: String(import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID),
  appwriteWishlistCollectionId: String(import.meta.env.VITE_APPWRITE_WISHLIST_COLLECTION_ID),
  appwriteOrdersCollectionId: String(import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config
