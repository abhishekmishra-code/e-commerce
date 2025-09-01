import { Client, Storage, ID } from 'appwrite'
import config from '../config/config'

class StorageService {
  client = new Client()
  storage

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId)

    this.storage = new Storage(this.client)
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.error('File upload error:', error)
      throw error
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId
      )
    } catch (error) {
      console.error('File deletion error:', error)
      throw error
    }
  }

  async getFile(fileId) {
    try {
      return await this.storage.getFile(
        config.appwriteBucketId,
        fileId
      )
    } catch (error) {
      console.error('Get file error:', error)
      throw error
    }
  }

  async listFiles() {
    try {
      return await this.storage.listFiles(config.appwriteBucketId)
    } catch (error) {
      console.error('List files error:', error)
      throw error
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }

  getFileDownload(fileId) {
    return this.storage.getFileDownload(
      config.appwriteBucketId,
      fileId
    )
  }
}

const storageService = new StorageService()
export default storageService