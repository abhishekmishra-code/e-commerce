import { useEffect, useRef } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router'

const MobileMenu = ({ isOpen, setIsOpen, userData, logo, menuItems, Logo }) => {
  const menuRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center p-4 bg-[#2874f0] dark:bg-gray-800">
          <div
            onClick={() => (!userData && navigate('/login'), setIsOpen(false))}
            className="flex items-center flex-1"
          >
            <UserCircleIcon className="h-8 w-8 text-white" />
            <span className="ml-3 text-white font-medium">
              {userData?.name || 'Login & Signup'}
            </span>
          </div>
          <Logo src={logo} alt="Logo" className="h-6" />
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {menuItems.map((item, index) => {
            if (!userData && item.title === 'Logout') return
            else
              return (
                <Link
                  key={index}
                  to={item.to}
                  onClick={(e) => {
                    e.preventDefault()
                    if (item.onClick) {
                      item.onClick()
                    }
                    setIsOpen(false)
                  }}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 
                dark:hover:bg-gray-800 border-b border-gray-100 
                dark:border-gray-700 transition duration-150"
                >
                  <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="ml-3 text-gray-700 dark:text-gray-200">
                    {item.title}
                  </span>
                </Link>
              )
          })}
        </div>
      </div>
    </>
  )
}

export default MobileMenu
