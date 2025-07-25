import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import SignUpPage from './pages/SignUpPage.jsx'
import Home from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import CartPage from './pages/CartPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import AddProductForm from './pages/AddProductForm.jsx'
import ProductViewPage from './pages/ProductViewPage.jsx'
import EcommerceHomePage from './pages/Test.jsx'
import ContactUs from './pages/ContactUs.jsx'
import ShippingPolicy from './pages/ShippingPolicy.jsx'
import ReturnsAndExchanges from './pages/ReturnsAndExchanges.jsx'
import FAQPage from './pages/FAQPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import SearchResults from './pages/SearchResults.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Home />,
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/wishlist',
        element: <WishlistPage />,
      },
      {
        path: '/support/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/admin/add-product',
        element: (
          // <ProtectedRoute>
          <AddProductForm />
          // </ProtectedRoute>
        ), // Optional: only allow admins
      },
      {
        path: '/product/:productId',
        element: <ProductViewPage />, // Optional: only allow admins
      },
      {
        path: '/products/search',
        element: <SearchResults />, // Optional: only allow admins
      },
      {
        path: '/support/shipping-policy',
        element: <ShippingPolicy />, // Optional: only allow admins
      },
      {
        path: '/support/returns-&-exchanges',
        element: <ReturnsAndExchanges />, // Optional: only allow admins
      },
      {
        path: '/support/faq',
        element: <FAQPage />, // Optional: only allow admins
      },
      {
        path: '/checkout',
        element: <CheckoutPage />, // Optional: only allow admins
      },
      {
        path: '/order-confirmation',
        element: <OrderConfirmationPage />, // Optional: only allow admins
      },
      {
        path: '/orders',
        element: <OrdersPage />, // Optional: only allow admins
      },
      {
        path: '/test',
        element: <EcommerceHomePage />, // Optional: only allow admins
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <RouterProvider router={router} />
)
