import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/layout/Header/Header";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "./redux/slices/authSlice";
import { Link, Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/layout/Footer/Footer";
import { FaFacebookF, FaInstagram, FaTruck, FaWhatsapp } from "react-icons/fa";

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    // Load saved preference from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update HTML class and localStorage when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Pass theme toggle to Header
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      {/* <!-- Top Bar --> */}
      <div class="top-bar flex items-center justify-between bg-[#1a8d8d] px-1.5 py-2 text-white sm:px-[4vw] md:px-[2vw]">
        <span className="flex items-center gap-1 md:text-base text-sm">
          <FaTruck className="w-5" />
          Fast Delhi Delivery | Serving New Delhi & NCR
        </span>
        <span class="socials flex space-x-1">
          <Link
            to="#"
            className="ml-3 text-lg text-[var(--white)] hover:text-[var(--bg-secondary]"
          >
            <FaFacebookF />
          </Link>
          <Link
            to="#"
            className="ml-3 text-lg text-[var(--white)] hover:text-[var(--bg-secondary]"
          >
            <FaInstagram />
          </Link>
          <Link
            to="#"
            className="ml-3 text-lg text-[var(--white)] hover:text-[var(--bg-secondary]"
          >
            <FaWhatsapp />
          </Link>
        </span>
      </div>
      <Header onThemeToggle={toggleDarkMode} isDarkMode={darkMode}/>
      <ToastContainer position="top-center" />
      <main className=" md:pt-0 md:pb-12 dark:bg-gray-900 bg-[var(--bg)]">
        <Outlet/>
      </main>
      <Footer />
    </>
  );
}

export default App;
