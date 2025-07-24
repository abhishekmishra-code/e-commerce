import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../appwrite/authService' // Update this path as needed

// Initial State
const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error'
  userData: null,
  error: null,
}

// ---------------------------
// Thunks (Async Functions)
// ---------------------------

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await authService.login({ email, password })
      const userData = await authService.getCurrentUser()
      return userData
    } catch (error) {
      return rejectWithValue(error?.message || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      await authService.register({ email, password, name })
      await authService.login({ email, password })
      const userData = await authService.getCurrentUser()
      
      return userData
    } catch (error) {
      return rejectWithValue(error?.message || 'Registration failed')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
      return true
    } catch (error) {
      return rejectWithValue(error?.message || 'Logout failed')
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const userData = await authService.getCurrentUser()
      if (!userData) throw new Error('No active session')
      return userData
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch user')
    }
  }
)

// ---------------------------
// Auth Slice
// ---------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.userData = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error'
        state.userData = null
        state.error = action.payload
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.userData = action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'error'
        state.userData = null
        state.error = action.payload
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'unauthenticated'
        state.userData = null
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })

      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.userData = action.payload
        state.error = null
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'unauthenticated'
        state.userData = null
        state.error = action.payload
      })
  },
})

// Exports
export const { resetError } = authSlice.actions

export default authSlice.reducer