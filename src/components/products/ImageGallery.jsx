import { motion as Motion, AnimatePresence } from 'framer-motion'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const ImageGallery = ({ images, selectedImage, setSelectedImage }) => {
  const [imageError, setImageError] = useState({})
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleImageError = (idx) => {
    setImageError(prev => ({ ...prev, [idx]: true }))
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image Container */}
        <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden">
          <Motion.div 
            layoutId="productImage"
            className="absolute inset-0 flex items-center justify-center"
          >
            {images[selectedImage] && !imageError[selectedImage] ? (
              <Motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={images[selectedImage]}
                  alt="Product"
                  onError={() => handleImageError(selectedImage)}
                  className="w-full h-full object-contain"
                />
                {/* Zoom hint overlay */}
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-white text-sm">Click to zoom</span>
                </div>
              </Motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full text-gray-400 dark:text-gray-500">
                <PhotoIcon className="w-24 h-24 mb-4" />
                <span className="text-sm">No Image Available</span>
              </div>
            )}
          </Motion.div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, idx) => (
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 
                ${selectedImage === idx ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''}
                hover:shadow-lg transition-shadow duration-200`}
            >
              {image && !imageError[idx] ? (
                <img
                  src={image}
                  alt={`View ${idx + 1}`}
                  onError={() => handleImageError(idx)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-500">
                  <PhotoIcon className="w-6 h-6" />
                </div>
              )}
              {selectedImage === idx && (
                <div className="absolute inset-0 bg-indigo-500 opacity-10" />
              )}
            </Motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <Motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full h-full flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <img
                src={images[selectedImage]}
                alt="Product large view"
                className="max-w-full max-h-full object-contain"
                onError={() => handleImageError(selectedImage)}
              />

              {/* Navigation arrows */}
              {selectedImage > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(prev => prev - 1)
                  }}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  ←
                </button>
              )}
              {selectedImage < images.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(prev => prev + 1)
                  }}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  →
                </button>
              )}
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGallery