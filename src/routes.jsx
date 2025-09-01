// src/routes.js

import App from "./App.jsx";
import Home from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import AddProductForm from "./pages/AddProductForm.jsx";
import ProductViewPage from "./pages/ProductViewPage.jsx";
import EcommerceHomePage from "./pages/Test.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import ReturnsAndExchanges from "./pages/ReturnsAndExchanges.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import NotFound from "./pages/NotFound.jsx";
import Index from "./pages/Index.jsx";
import Products from "./pages/Products.jsx";
import AdminLayout from "./components/layout/AdminLayout.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Home /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/support/contact-us", element: <ContactUs /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      {
        path: "/admin/add-product",
        element: <AddProductForm />,
      },
      {
        path: "/product/:productId",
        element: <ProductViewPage />,
      },
      {
        path: "/products/search",
        element: <SearchResults />,
      },
      {
        path: "/support/shipping-policy",
        element: <ShippingPolicy />,
      },
      {
        path: "/support/returns-&-exchanges",
        element: <ReturnsAndExchanges />,
      },
      {
        path: "/support/faq",
        element: <FAQPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-confirmation",
        element: <OrderConfirmationPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/test",
        element: <EcommerceHomePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,   // No Header/Footer!
    errorElement: <NotFound />,
    children: [
      { path: '/admin/dashboard', element: <Index /> },
      { path: "products", element: <Products /> },
    ],
  },
];

export default routes;
