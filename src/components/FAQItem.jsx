import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg group"
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {question}
        </span>
        <ChevronDownIcon
          className={`${
            isOpen ? 'rotate-180 transform' : ''
          } h-5 w-5 text-indigo-500 transition-transform duration-200`}
        />
      </button>
      <div
        className={`mt-4 text-gray-500 dark:text-gray-300 transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <p className="prose dark:prose-invert">{answer}</p>
      </div>
    </div>
  )
}

export default FAQItem