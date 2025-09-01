import { Account, Client, ID } from 'appwrite'
import config from '../config/config'

class AuthService {
  client = new Client()
  account

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId)

    this.account = new Account(this.client)
  }

  async register({ email, password, name }) {
    try {
      return await this.account.create(ID.unique(), email, password, name)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current')
    } catch (error) {
      console.error('Logout error:', error.message)
      throw new Error('Logout failed: ' + error.message)
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      error.code === 401 ? console.log('No active session') :
      console.error('Get current user error:', error)
      return null
    }
  }

  async isAuthenticated() {
    try {
      const user = await this.account.get()
      return !!user
    } catch {
      return false
    }
  }

  //  Get user preferences
  async getPreferences() {
    try {
      return await this.account.getPrefs()
    } catch (error) {
      console.error('Error getting preferences:', error)
      throw error
    }
  }

  //  Update email
  async updateEmail({ email, password }) {
    try {
      return await this.account.updateEmail(email, password)
    } catch (error) {
      console.error('Error updating email:', error)
      throw error
    }
  }

  //  Update name
  async updateName({ name }) {
    try {
      return await this.account.updateName(name)
    } catch (error) {
      console.error('Error updating name:', error)
      throw error
    }
  }

  //  Update password
  async updatePassword({ newPassword, oldPassword = '' }) {
    try {
      return await this.account.updatePassword(newPassword, oldPassword)
    } catch (error) {
      console.error('Error updating password:', error)
      throw error
    }
  }

  //  Update phone number
  async updatePhone({ phone, password }) {
    try {
      return await this.account.updatePhone(phone, password)
    } catch (error) {
      console.error('Error updating phone:', error)
      throw error
    }
  }

  //  Block user account (disable access)
  async blockAccount() {
    try {
      return await this.account.updateStatus()
    } catch (error) {
      console.error('Error blocking account:', error)
      throw error
    }
  }

  //  List all user sessions
  async listSessions() {
    try {
      return await this.account.listSessions()
    } catch (error) {
      console.error('Error listing sessions:', error)
      throw error
    }
  }
}

const authService = new AuthService()

export default authService
