import { useLocation, Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 p-6">
      <div className="max-w-lg w-full text-center animate-fadeIn">
        {/* Animated Warning Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 text-red-500 p-6 rounded-full animate-bounce shadow-lg">
            <AlertTriangle size={48} />
          </div>
        </div>
        

        {/* Big 404 text */}
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-md animate-pulse">
          404
        </h1>
        
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! That page doesn’t exist.
        </p>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          The page you’re looking for might have been removed, renamed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-transform transform hover:scale-105"
          >
            <Home size={20} /> Return Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-400 text-gray-700 hover:text-gray-900 hover:border-gray-600 font-medium rounded-lg shadow transition-transform transform hover:scale-105"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </div>

        {/* Decorative Image */}
        <div className="mt-10">
          <img
            src="https://cdn.pixabay.com/photo/2012/04/10/17/38/moon-26619_1280.png"
            alt="Lost in Space"
            className="mx-auto max-w-sm opacity-90 animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;