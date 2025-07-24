// const Header = ({
//   logo,
//   navigationItems,
//   user,
//   onLogin,
//   onLogout,
//   ctaButton,
//   theme = 'light',
//   sticky = false,
//   className = '',
//   onThemeToggle,
//   isDarkMode,
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const { userData } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     if (userData) {
//       dispatch(fetchCartItems(userData.$id))
//       dispatch(fetchWishlistItems(userData.$id))
//       dispatch(fetchUserOrders(userData.$id))
//     }
//   }, [dispatch, userData])

//   // Handle scroll effect for sticky header
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Close mobile menu when resizing to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsMenuOpen(false)
//       }
//     }
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // Theme classes
//   const themeClasses =
//     theme === 'dark'
//       ? 'bg-gray-900 text-white'
//       : 'bg-gray-100 text-gray-900 border-b border-gray-100 dark:border-none'

//   const scrolledClasses = scrolled
//     ? 'shadow-md bg-gray-900 py-2 dark:bg-gray-800'
//     : 'py-4'

//   return (
//     <header
//       className={`transition-all duration-300 light ${
//         isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-950'
//       } ${sticky ? 'sticky top-0 z-50' : ''} ${scrolledClasses} ${className}`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <Link to={'/'}>
//             <div className="flex-shrink-0">
//               {typeof logo === 'string' ? (
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="h-8 w-auto"
//                   width={32}
//                   height={32}
//                 />
//               ) : (
//                 <>{logo}</>
//               )}
//             </div>
//           </Link>

//           <div className="flex justify-between items-center space-x-8">
//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex md:items-center md:space-x-8">
//               <ul className="flex space-x-8">
//                 {navigationItems.map((item, i) => (
//                   <li key={i}>
//                     <NavLink
//                       to={item.to}
//                       className={({ isActive }) =>
//                         isActive
//                           ? 'text-red-500 underline hover:text-primary-500 transition-colors duration-200 font-medium'
//                           : 'hover:text-primary-500 transition-colors duration-200 font-medium'
//                       }
//                       aria-current={item.isActive ? 'page' : undefined}
//                     >
//                       {item.label}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </nav>

//             {/* Theme toggle button */}
//             <button
//               onClick={onThemeToggle}
//               className="p-2 cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hidden md:block"
//             >
//               {isDarkMode ? (
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   {/* Sun icon */}
//                   <path
//                     fillRule="evenodd"
//                     d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   {/* Moon icon */}
//                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                 </svg>
//               )}
//             </button>

//             {/* Auth Section */}
//             <div className="hidden md:flex items-center space-x-4">
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span>Hi, {user.name}</span>
//                   <button
//                     onClick={onLogout}
//                     className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-md transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={onLogin}
//                   className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-md transition-colors"
//                 >
//                   Login
//                 </button>
//               )}

//               {ctaButton && <div className="flex gap-4 ml-4">{ctaButton}</div>}
//             </div>
//           </div>

//           <div className='flex items-center md:hidden'>
//             {/* Theme toggle button */}
//             <button
//               onClick={onThemeToggle}
//               className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               {isDarkMode ? (
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   {/* Sun icon */}
//                   <path
//                     fillRule="evenodd"
//                     d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   {/* Moon icon */}
//                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                 </svg>
//               )}
//             </button>
//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isMenuOpen ? (
//                 <XIcon className="h-6 w-6" />
//               ) : (
//                 <MenuIcon className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4">
//             <ul className="space-y-4">
//               {navigationItems.map((item) => (
//                 <li key={item.label}>
//                   <NavLink
//                     to={item.to}
//                     className="block py-2 hover:text-primary-500"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.label}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-6 pt-6 border-t border-gray-200">
//               {user ? (
//                 <div className="flex items-center justify-between">
//                   <span>Hi, {user.name}</span>
//                   <button
//                     onClick={() => {
//                       onLogout()
//                       setIsMenuOpen(false)
//                     }}
//                     className="px-4 cursor-pointer py-2 bg-primary-500 text-white rounded-md"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     onLogin()
//                     setIsMenuOpen(false)
//                   }}
//                   className={`w-full px-4 py-2 cursor-pointer bg-primary-500 ${themeClasses} text-white rounded-md`}
//                 >
//                   Login
//                 </button>
//               )}

//               {ctaButton && <div className="mt-4">{ctaButton}</div>}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   )
// }

// export default Header

import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  MapPinIcon,
  Bars3Icon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import {
  UserCircleIcon,
  StarIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  TicketIcon,
  GiftIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import Logo from "./Logo";
import logo from "../../../assets/ecom.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../../redux/slices/cartSlice";
import { fetchWishlistItems } from "../../../redux/slices/wishlistSlice";
import { fetchUserOrders } from "../../../redux/slices/ordersSlice";
import MobileMenu from "./MobileMenu";
import { logoutUser } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";

const Header = ({ onThemeToggle, isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userData) {
      dispatch(fetchCartItems(userData.$id));
      dispatch(fetchWishlistItems(userData.$id));
      dispatch(fetchUserOrders(userData.$id));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) setIsScrolled(true);
      else setIsScrolled(false);

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "My Profile", icon: UserCircleIcon, to: "#" },
    { title: "SuperCoin Zone", icon: StarIcon, to: "#" },
    { title: "Plus Zone", icon: PlusCircleIcon, to: "#" },
    { title: "Orders", icon: ShoppingBagIcon, to: "/orders" },
    { title: "Wishlist", icon: HeartIcon, to: "/wishlist" },
    { title: "Coupons", icon: TicketIcon, to: "#" },
    { title: "Gift Cards", icon: GiftIcon, to: "#" },
    { title: "Notifications", icon: BellIcon, to: "#" },
    {
      title: "Logout",
      icon: ArrowRightOnRectangleIcon,
      to: "#",
      onClick: () => {
        dispatch(logoutUser());
        toast(`You’ve been logged out. See you soon!`);
      },
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md dark:bg-gray-900/95"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        {/* Mobile Header */}
        <div className={`md:hidden`}>
          <div
            className={`flex transform items-center p-4 transition-all duration-300 ease-in-out ${
              isScrolled ? "h-0 pt-0 opacity-0" : "h-14 pt-4 opacity-100"
            }`}
          >
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link to="/" className="flex-1">
              {/* <img src="/your-logo.png" alt="Logo" className="h-10" /> */}
              <Logo src={logo} alt="Logo" className="h-10" />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to={`${userData ? "/account" : "/login"}`}
                className="flex space-x-1"
              >
                <UserCircleIcon className="h-6 w-6" />
                {!userData && <span>Login</span>}
              </Link>
              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="h-6 w-6" />
                {!!cartItems?.length && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6161] text-xs text-white">
                    {cartItems?.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="px-4 pb-3">
            <div className="flex items-center rounded-lg border-2 border-[#2a55e5] bg-gray-50 p-2 dark:bg-gray-800">
              <MagnifyingGlassIcon className="mr-2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile Location Bar */}
          {/* <div className="px-4 py-3 flex items-center bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 13.5C8 13.5 3 9 3 5.5C3 3 5 1 8 1C11 1 13 3 13 5.5C13 9 8 13.5 8 13.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="8"
              cy="5.5"
              r="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Location not set</p>
            <p className="text-sm text-[#2a55e5] font-medium">
              Select delivery location
            </p>
          </div>
          <ChevronDownIcon className="h-5 w-5 text-[#2a55e5]" />
        </div> */}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex-shrink-0">
                  {isDarkMode ? (
                    <svg
                      width="60.93"
                      height="50"
                      fill="white"
                      viewBox="0 0 504 418"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M123.867 46.2C106.667 54.0666 105.6 78.7333 122.4 86.3333C129.867 89.8 136.4 89.6666 143.467 85.9333L149.333 82.7333L157.067 85.4C162.267 87.1333 165.2 88.8666 166 90.8666C166.667 92.3333 168.667 103 170.667 114.333C174.8 138.867 176.133 141.533 185.067 142.067C189.867 142.333 191.867 141.8 193.867 139.8C196.667 137 197.333 137 319.867 137C387.6 137 444.133 136.6 445.333 136.2C448.4 135 451.467 128.2 450.533 124.467C450.133 122.6 448.533 120.067 447.067 118.733C444.533 116.467 438.133 116.333 318 115.933L191.6 115.667L189.467 103.267C186.133 85.2666 183.867 77.9333 180.133 74.4666C178.267 72.7333 171.6 69.4 165.333 67C154.667 63 153.467 62.2 151.333 57.5333C148.533 51.1333 145.067 47.9333 138.4 45.5333C131.733 43.2666 130.4 43.2666 123.867 46.2Z" />
                      <path d="M52.1333 119.667C45.6 120.867 43.7333 123.4 42.6666 132.2C42.1333 135.933 42 168.333 42.2666 204.067L42.6666 268.867L45.7333 271.933C48.6666 275 49.3333 275 85.7333 275.4C121.867 275.8 122.8 275.8 126.4 273C130.933 269.4 130.933 265.8 126.667 261.533L123.333 258.2L96.2666 258.333C81.4666 258.467 67.0666 258.467 64.4 258.467L59.3333 258.333V231.8V205.133L86.8 204.733C112.4 204.333 114.4 204.2 116.133 201.667C118.267 198.867 117.733 192.2 115.2 189.667C114.4 188.867 102.8 188.067 86.9333 187.667L60 187V161.667V136.333L92.6666 136.067C124.133 135.667 125.467 135.533 127.733 132.867C128.933 131.267 130 129 130 127.667C130 126.333 128.933 124.067 127.733 122.467C125.467 119.933 123.733 119.8 91.3333 119.133C72.6666 118.867 54.9333 119 52.1333 119.667Z" />
                      <path d="M168.133 155.133C157.2 158.6 146.533 167.133 140.4 177C129.467 195.133 133.067 221.667 148.667 236.733C158.4 246.067 167.067 249.533 182.133 250.067C194.133 250.6 195.467 250.333 202.8 246.6C212.267 241.667 220.667 233.8 220.667 229.667C220.667 226.067 216.8 222.333 212.8 222.333C211.2 222.333 206.933 224.467 203.2 227C194.667 232.867 187.467 234.867 178.533 233.667C159.2 231.267 146.133 211.267 151.733 192.733C156.133 178.333 167.333 170.2 182.4 170.2C191.733 170.2 197.333 172.067 204.533 177.533C212.4 183.4 220.667 180.867 220.667 172.6C220.667 168.6 214.4 163.4 202.667 157.4C194.267 153 177.867 151.933 168.133 155.133Z" />
                      <path d="M264 154.733C249.733 158.467 238 168.333 231.733 181.667C228.533 188.6 228 191.4 228 201.667C228 212.333 228.533 214.6 232.133 222.333C236.933 232.467 245.2 241.133 254.667 246.067C263.467 250.6 280.667 251.667 291.467 248.467C305.067 244.467 318 231.8 322.933 217.667C324.267 213.533 325.2 207.133 325.2 200.867C325.2 192.467 324.533 189.4 320.933 181.933C310.8 160.2 287.067 148.867 264 154.733ZM289.333 172.2C295.467 174.733 301.733 180.733 305.067 186.867C308.8 193.8 309.2 210.2 305.733 216.467C298 230.6 279.733 237.933 265.333 232.467C258.933 229.933 249.867 221.933 246.8 215.8C240.4 203.4 243.867 188.2 255.6 177.667C265.067 169.267 277.333 167.267 289.333 172.2Z" />
                      <path d="M358.8 155.8C351.6 158.333 350.667 158.333 346.667 156.467C341.067 153.8 340.4 153.8 336.933 157C334 159.8 334 160.2 334 202.867V246.067L337.333 248.2C341.6 251 345.067 250.867 347.733 247.933C349.733 245.8 350 241.667 350 217.533C350 201.4 350.667 187.4 351.467 184.333C352.267 181.533 354.933 177.133 357.333 174.733C361.2 170.867 362.667 170.333 368.4 170.333C373.733 170.333 376 171.133 379.2 173.8C386.4 179.8 386.667 180.733 387.333 215L388 247L391.867 248.867C395.333 250.467 396.267 250.467 399.2 248.867L402.667 246.867L403.333 215C403.867 191 404.533 182.067 405.867 179.267C408.667 173.933 415.2 170.333 422.533 170.333C427.733 170.333 429.467 171.133 433.733 174.867L438.667 179.4L439.333 212.867C440 244.2 440.133 246.333 442.667 248.2C446.533 251.133 450.4 250.733 453.867 247.133C456.8 243.933 456.933 243.667 456.4 211.533C455.867 175.8 455.6 173.933 447.333 164.467C435.733 151.4 415.333 149.667 401.067 160.6L395.067 165.267L390.8 161.133C382.933 153.533 370.933 151.533 358.8 155.8Z" />
                      <path d="M404.4 259.267C403.2 260.6 401.6 263.8 400.8 266.467L399.2 271.4L376.267 272.2C363.6 272.733 320.933 273.8 281.333 274.867C201.467 276.867 207.067 277.4 205.467 267.8C205.067 265.133 203.6 261.667 202.133 260.467C199.867 258.333 198.933 258.333 194.4 259.8C191.6 260.6 188.533 261.667 187.467 261.933C186 262.333 185.733 264.333 186.4 271.667C187.467 284.067 190.933 291.667 197.067 294.867C201.733 297.4 203.467 297.533 278.267 295.8C394.667 293.267 406.667 292.6 410.933 289.533C418.933 283.533 423.6 265.133 418.667 259.667C415.6 256.2 407.2 256.067 404.4 259.267Z" />
                      <path d="M205.467 321C199.467 322.867 191.734 331.133 190.134 337.533C187.467 348.2 192.934 360.333 202.534 364.867C209.734 368.467 214.667 368.333 222 364.6C228.534 361.267 232 357.267 234.667 349.533C236 345.533 237.334 344.2 240.267 343.533C242.267 343 267.467 342.6 296.267 342.467L348.534 342.333L350.534 339.4C353.067 335.8 353.334 329 350.934 325.8C348.267 322.067 340.934 321.267 313.734 321.667C248.8 322.6 223.734 322.333 218.667 321.133C212.4 319.533 210.667 319.533 205.467 321Z" />
                      <path d="M378.933 320.6C376.8 320.867 372.8 323.533 370 326.333C357.866 338.467 360.533 357.133 375.333 364.733C386.533 370.6 400.533 366.2 405.866 355.133C411.2 344.2 408.133 330.2 398.933 324.067C394.4 321 385.6 319.4 378.933 320.6Z" />
                    </svg>
                  ) : (
                    <Logo src={logo} alt="Logo" />
                  )}
                </Link>

                <button className="hidden items-center space-x-1 text-gray-700 hover:text-[#2a55e5] lg:flex dark:text-gray-300">
                  <MapPinIcon className="h-5 w-5" />
                  <div className="text-xs">
                    <p className="text-gray-500 dark:text-gray-400">
                      Deliver to
                    </p>
                    <p className="font-medium">Select Location</p>
                  </div>
                </button>
              </div>

              {/* Search Bar */}
              <div className="mx-8 hidden max-w-2xl flex-1 md:block">
                <div className="relative">
                  <div className="flex">
                    <select
                      className="h-10 rounded-l-lg border-r border-gray-300 bg-gray-100 px-3 text-sm focus:outline-none dark:text-white dark:border-gray-700 dark:bg-gray-800"
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                    >
                      <option>All</option>
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Books</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Search products, brands and more..."
                      className="h-10 w-full bg-gray-100 px-4 focus:outline-none dark:text-white dark:bg-gray-800"
                    />
                    <button className="h-10 rounded-r-lg bg-[#2a55e5] px-6 text-white hover:bg-[#2a55e5]/90">
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-6">
                {/* Account Dropdown */}
                <div
                  className={`group relative h-full cursor-pointer hover:border ${
                    !userData
                      ? "hover:bg-blue-700 hover:text-white"
                      : "hover:bg-gray-100 hover:text-[#2a55e5] dark:hover:bg-gray-800"
                  } rounded-lg border-gray-400 px-1.5 py-2`}
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <Link
                    to={!userData ? "/login" : "#"}
                    className={`group flex cursor-pointer items-center space-x-2 dark:text-gray-300`}
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="hidden md:block">
                      {userData?.name || "Login"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute left-1/2 mt-[9px] w-60 -translate-x-1/2 rounded-lg bg-gray-50 py-2 text-black shadow-lg dark:text-white dark:bg-gray-800">
                      {!userData && (
                        <Link
                          to="/signup"
                          title="Sign Up"
                          className="flex items-center justify-between border-b-1 p-3"
                        >
                          <span className="">New customer?</span>
                          <span className="font-semibold text-blue-700">
                            Sign Up
                          </span>
                        </Link>
                      )}
                      {menuItems.map((item, index) => {
                        if (!userData && item.title === "Logout") return;
                        else
                          return (
                            <Link
                              key={index}
                              to={item.to}
                              onClick={
                                !!item.onClick && !!userData
                                  ? () => item.onClick()
                                  : ""
                              }
                              className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <item.icon className="h-6 w-6" />
                              <span>{item.title}</span>
                            </Link>
                          );
                      })}
                    </div>
                  )}
                </div>

                <Link
                  to="/wishlist"
                  className="hidden items-center space-x-1 text-gray-700 hover:text-[#2a55e5] sm:flex dark:text-gray-300"
                >
                  <HeartIcon className="h-6 w-6" />
                  <span className="hidden lg:block">Wishlist</span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#2a55e5] dark:text-gray-300"
                >
                  <div className="relative">
                    <ShoppingCartIcon className="h-6 w-6" />
                    {!!cartItems.length && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6161] text-xs text-white">
                        {cartItems?.length}
                      </span>
                    )}
                  </div>
                  <span className="hidden lg:block">Cart</span>
                </Link>

                {/* Theme toggle button */}
                <button
                  onClick={onThemeToggle}
                  className="flex cursor-pointer items-center space-x-1 text-gray-700 hover:text-[#2a55e5] dark:text-gray-300"
                >
                  {isDarkMode ? (
                    <>
                      <SunIcon className="h-6 w-6" />
                      <span className="hidden lg:block">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <MoonIcon className="h-6 w-6" />
                      <span className="hidden lg:block">Dark Mode</span>
                    </>
                  )}
                </button>

                <button className="md:hidden">
                  <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        userData={userData}
        logo={logo}
        menuItems={menuItems}
        Logo={Logo}
      />
    </>
  );
};

export default Header;
