  import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
  import storageService from '../../appwrite/storageService'

  // Async thunks
  export const uploadFile = createAsyncThunk(
    'storage/uploadFile',
    async (file) => {
      return await storageService.uploadFile(file)
    }
  )

  export const fetchFiles = createAsyncThunk(
    'storage/fetchFiles',
    async () => {
      return await storageService.listFiles()
    }
  )

  export const deleteFile = createAsyncThunk(
    'storage/deleteFile',
    async (fileId) => {
      await storageService.deleteFile(fileId)
      return fileId
    }
  )

  export const getFileDetails = createAsyncThunk(
    'storage/getFileDetails',
    async (fileId) => {
      return await storageService.getFile(fileId)
    }
  )

  const storageSlice = createSlice({
    name: 'storage',
    initialState: {
      files: [],
      currentFile: null,
      status: 'idle',
      error: null
    },
    reducers: {
      clearCurrentFile: (state) => {
        state.currentFile = null
      }
    },
    extraReducers: (builder) => {
      builder
        // Upload file cases
        .addCase(uploadFile.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(uploadFile.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.files.push(action.payload)
        })
        .addCase(uploadFile.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })

        // Fetch files cases
        .addCase(fetchFiles.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchFiles.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.files = action.payload.files
        })
        .addCase(fetchFiles.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })

        // Delete file cases
        .addCase(deleteFile.fulfilled, (state, action) => {
          state.files = state.files.filter(file => file.$id !== action.payload)
        })

        // Get file details cases
        .addCase(getFileDetails.fulfilled, (state, action) => {
          state.currentFile = action.payload
        })
    }
  })

  export const { clearCurrentFile } = storageSlice.actions

  // Selectors
  export const selectAllFiles = (state) => state.storage.files
  export const selectCurrentFile = (state) => state.storage.currentFile
  export const selectStorageStatus = (state) => state.storage.status
  export const selectStorageError = (state) => state.storage.error

  export default storageSlice.reducer