import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHandshake, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = {
    name: "Bro",
    profilePic: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-gray-950/80 via-gray-900/80 to-black/80 text-white shadow-[0_0_20px_rgba(255,165,0,0.1)] sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2">
          <FaHandshake className="text-orange-400 text-2xl" />
          <span className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
            PlateShare
          </span>
        </Link>

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

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full font-semibold text-black bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 hover:scale-105 shadow-md"
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-orange-400 cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200">
                <Link to="/add-food" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-orange-400">Add Food</Link>
                <Link to="/manage-foods" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-orange-400">Manage My Foods</Link>
                <Link to="/my-requests" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-orange-400">My Food Requests</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-500">Logout</button>
              </div>
            </div>
          )}
        </div>

        <button
          className="md:hidden text-orange-400 text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`md:hidden transform transition-all duration-500 ease-in-out origin-top ${
          isMenuOpen ? "opacity-100 scale-y-100 max-h-[500px]" : "opacity-0 scale-y-0 max-h-0"
        } bg-gray-950 border-t border-gray-800 px-6 py-4 space-y-3 flex flex-col`}
      >
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-orange-400 transition">Home</Link>
        <Link to="/available-foods" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-orange-400 transition">Available Foods</Link>

        {!isLoggedIn ? (
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="px-5 py-2 rounded-full font-semibold text-center text-black bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 shadow-md"
          >
            Login
          </Link>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-orange-400" />
              <span className="font-medium">{user.name}</span>
            </div>
            <Link to="/add-food" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-orange-400 transition">Add Food</Link>
            <Link to="/manage-foods" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-orange-400 transition">Manage My Foods</Link>
            <Link to="/my-requests" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-orange-400 transition">My Food Requests</Link>
            <button onClick={handleLogout} className="w-full text-left text-red-400 hover:text-red-500 transition">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
