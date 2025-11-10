import { Link } from "react-router-dom";
import { FaHandshake } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-gray-950/80 via-gray-900/80 to-black/80 text-white shadow-[0_0_20px_rgba(255,165,0,0.1)] sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaHandshake className="text-orange-400 text-2xl" />
          <span className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
            PlateShare
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="relative font-medium text-gray-300 hover:text-orange-400 transition duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-orange-500 after:to-yellow-500 hover:after:w-full after:transition-all after:duration-300"
          >
            Home
          </Link>

          <Link
            to="/available-foods"
            className="relative font-medium text-gray-300 hover:text-orange-400 transition duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-orange-500 after:to-yellow-500 hover:after:w-full after:transition-all after:duration-300"
          >
            Available Foods
          </Link>

          <Link
            to="/login"
            className="px-5 py-2 rounded-full font-semibold text-black bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 hover:scale-105 shadow-md"
          >
            Login
          </Link>
        </div>

        <button className="md:hidden text-orange-400 text-2xl focus:outline-none">
          ☰
        </button>
      </div>
    </nav>
  );
}
