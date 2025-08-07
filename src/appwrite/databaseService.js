import { Client, Databases, ID, Permission, Query, Role } from 'appwrite'
import config from '../config/config'

class DatabaseService {
  client = new Client()
  databases

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId)

    this.databases = new Databases(this.client)
  }

  // Product operations
  async createProduct(productData) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteProductsCollectionId,
        ID.unique(),
        productData
      )
    } catch (error) {
      console.error('Create product error:', error)
      throw error
    }
  }

  async getProducts(queries = [Query.limit(10)]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteProductsCollectionId,
        queries
      )
    } catch (error) {
      console.error('Get products error:', error)
      return []
    }
  }

  async getProductById(productId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteProductsCollectionId,
        productId
      )
    } catch (error) {
      console.error('Get product error:', error)
      return null
    }
  }

  // Cart operations
  async addToCart({ userId, productId, quantity }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCartCollectionId,
        ID.unique(),
        { userId, productId, quantity },
        [
        // Only the user who created the cart item can read/update/delete
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
      )
    } catch (error) {
      console.error('Add to cart error:', error)
      throw error
    }
  }

  async getCartItems(userId) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCartCollectionId,
        [Query.equal('userId', userId)]
      )
    } catch (error) {
      console.error('Get cart items error:', error)
      return []
    }
  }

  async updateCartItem(cartItemId, quantity) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCartCollectionId,
        cartItemId,
        { quantity }
      )
    } catch (error) {
      console.error('Update cart item error:', error)
      throw error
    }
  }

  async removeFromCart(cartItemId) {
    try {
      return await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCartCollectionId,
        cartItemId
      )
    } catch (error) {
      console.error('Remove from cart error:', error)
      throw error
    }
  }

  async clearCartItems(userId) {
    try {
      const cartItems = await this.getCartItems(userId)
      const deletePromises = cartItems.documents.map((item) =>
        this.removeFromCart(item.$id)
      )
      await Promise.all(deletePromises)
      return true
    } catch (error) {
      console.error('Clear cart error:', error)
      throw error
    }
  }

  // Wishlist operations
  async addToWishlist({ userId, productId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteWishlistCollectionId,
        ID.unique(),
        { userId, productId },
        [
        // Only the user who created the wishlist item can read/update/delete
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
      )
    } catch (error) {
      console.error('Add to wishlist error:', error)
      throw error
    }
  }

  async getWishlistItems(userId) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteWishlistCollectionId,
        [Query.equal('userId', userId)]
      )
    } catch (error) {
      console.error('Get wishlist items error:', error)
      return []
    }
  }

  async removeFromWishlist(wishlistItemId) {
    try {
      return await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteWishlistCollectionId,
        wishlistItemId
      )
    } catch (error) {
      console.error('Remove from wishlist error:', error)
      throw error
    }
  }

  // Order operations
  async createOrder(orderData) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteOrdersCollectionId,
        ID.unique(),
        orderData,
        [
        // Only the user who created the order can read/update/delete
        Permission.read(Role.user(orderData.user_id)), // or orderData.userId, match your schema
        Permission.update(Role.user(orderData.user_id)),
        Permission.delete(Role.user(orderData.user_id)),
      ]
      )
    } catch (error) {
      console.error('Create order error:', error)
      throw error
    }
  }

  async getUserOrders(userId) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteOrdersCollectionId,
        [Query.equal('userId', userId)]
      )
    } catch (error) {
      console.error('Get user orders error:', error)
      return []
    }
  }
}

const dbService = new DatabaseService()

export default dbService
