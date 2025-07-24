import React from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaWhatsapp 
} from 'react-icons/fa';

export default function ContactUs() {
  const socialLinks = [
    { icon: FaWhatsapp, href: '#', color: 'text-green-600 dark:text-green-500' },
    { icon: FaFacebook, href: '#', color: 'text-blue-600 dark:text-blue-500' },
    { icon: FaInstagram, href: '#', color: 'text-pink-600 dark:text-pink-500' },
    { icon: FaTwitter, href: '#', color: 'text-blue-400 dark:text-blue-400' },
    { icon: FaLinkedin, href: '#', color: 'text-blue-700 dark:text-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="flex justify-center mb-4">
          <ChatBubbleLeftRightIcon className="h-16 w-16 text-blue-600 dark:text-blue-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions about our products or services? We're here to help you create
          your perfect kitchen experience.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700/40">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 mr-2" />
                Contact Details
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      123, Kitchen Street<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                    <a href="mailto:support@electrokitchen.com" 
                       className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                      support@electrokitchen.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClockIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Saturday: 10AM - 7PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`${social.color} hover:opacity-80 transition-opacity`}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/20 p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                  >
                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 flex items-center justify-center">
            <QuestionMarkCircleIcon className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-3" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What are your customer service hours?",
                answer: "Our customer service team is available Monday through Saturday, 10 AM to 7 PM IST."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive tracking details via SMS and email."
              },
              {
                question: "Do you offer installation services?",
                answer: "Yes, we provide professional installation services for select appliances in major cities."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unused items in their original packaging."
              }
            ].map((faq, index) => (
              <div key={index} 
                   className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700/40">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}