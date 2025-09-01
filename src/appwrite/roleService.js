import { Client, Teams } from 'appwrite'
import config from '../config/config'

const client = new Client()
  .setEndpoint(config.appwriteEndpoint)
  .setProject(config.appwriteProjectId)

const teams = new Teams(client)

/**
 * Check if the current user is an admin
 * @returns {Promise<boolean>}
 */
export async function isCurrentUserAdmin() {
  try {
    const res = await teams.list()
    // Replace 'admins' with your actual team ID
    return res.teams.some(team => team.$id === 'admins')
  } catch (error) {
    console.error('Error checking admin role:', error)
    return false
  }
}