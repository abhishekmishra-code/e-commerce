import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { FaQuestionCircle } from 'react-icons/fa'
import FAQItem from '../components/FAQItem'
import { useNavigate } from 'react-router'

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are securely processed and encrypted."
  },
  {
    question: "How long does shipping take?",
    answer: "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination country."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused items in their original packaging. Return shipping is free for domestic orders."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package on our website."
  }
]

const FAQPage = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-full p-4 w-fit mx-auto shadow-lg">
          <FaQuestionCircle className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Find answers to common questions about our products and services
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-white/90 mb-6">
            Can't find the answer you're looking for? Our friendly team is here to help.
          </p>
          <button onClick={() => navigate('/support/contact-us')} className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default FAQPage