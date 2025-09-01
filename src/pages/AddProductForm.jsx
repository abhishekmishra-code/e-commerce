import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../redux/slices/storageSlice'
import dbService from '../appwrite/databaseService'
import Button from '../components/common/Button'
import { toast } from 'react-toastify'
import config from '../config/config'

const AddProductForm = () => {
  const dispatch = useDispatch()
  const [imagePreview, setImagePreview] = useState(null)
  
  const { status: uploadStatus, error: uploadError } = useSelector(
    (state) => state.storage
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      brand: ''
    }
  })

  const imageFile = watch('image')

  React.useEffect(() => {
    if (imageFile?.[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(imageFile[0])
    }
  }, [imageFile])

  const onSubmit = async (data) => {
    try {
      let imageUrl = ''
      
      // Handle image upload if file exists
      if (data.image?.[0]) {
        const fileUpload = await dispatch(uploadFile(data.image[0])).unwrap()
        
        if (fileUpload?.$id) {
          // Construct the file view URL
          imageUrl = `${config.appwriteEndpoint}/storage/buckets/${config.appwriteBucketId}/files/${fileUpload.$id}/view?project=${config.appwriteProjectId}`
        }
      }

      const payload = {
        name: data.name.trim(),
        price: Math.round(parseFloat(data.price) * 100),
        description: data.description?.trim() || '',
        category: data.category.trim(),
        image: imageUrl,
        stock: parseInt(data.stock),
        brand: data.brand.trim()
      }

      await dbService.createProduct(payload)
      toast.success('✅ Product added successfully!')
      reset()
      setImagePreview(null)
    } catch (error) {
      console.error('Add product error:', error)
      toast.error(`❌ Failed to add product: ${error.message}`)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md my-12">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name *</label>
          <input
            type="text"
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 3, message: 'Name must be at least 3 characters' }
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Product Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium">Brand Name *</label>
          <input
            type="text"
            {...register('brand', { 
              required: 'Name is required',
              minLength: { value: 3, message: 'Name must be at least 3 characters' }
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Product Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price *</label>
          <input
            type="number"
            step="0.01"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than 0' }
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="99.99"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register('description')}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            placeholder="Product description..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category *</label>
          <input
            type="text"
            {...register('category', { required: 'Category is required' })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g. electronics"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={uploadStatus === 'loading'}
          />
          {uploadStatus === 'loading' && (
            <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
          )}
          {uploadError && (
            <p className="text-red-500 text-sm mt-1">{uploadError}</p>
          )}
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium">Stock *</label>
          <input
            type="number"
            {...register('stock', {
              required: 'Stock is required',
              min: { value: 0, message: 'Stock cannot be negative' }
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="100"
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || uploadStatus === 'loading'}
            loading={isSubmitting || uploadStatus === 'loading'}
            className="w-full"
            variant="primary"
          >
            {isSubmitting || uploadStatus === 'loading' ? 'Adding Product...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm