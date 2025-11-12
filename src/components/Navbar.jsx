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
    <nav className="backdrop-blur-xl bg-gradient-to-r from-gray-950/95 via-gray-900/95 to-black/95 text-white shadow-2xl shadow-orange-500/5 sticky top-0 z-50 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-2.5 rounded-xl border border-orange-500/30 group-hover:border-orange-400 transition-all">
                <FaHandshake className="text-orange-400 text-2xl group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 group-hover:from-orange-300 group-hover:via-yellow-300 group-hover:to-orange-400 transition-all">
              PlateShare
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link 
              to="/" 
              className="px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>

            <Link 
              to="/available-foods" 
              className="px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">Available Foods</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>

            {!isLoggedIn ? (
              <Link 
                to="/login" 
                className="ml-4 px-6 py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 hover:from-orange-400 hover:via-yellow-300 hover:to-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 relative overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ) : (
              <div className="relative group ml-4">
                <div className="relative cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                  <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    className="relative w-11 h-11 rounded-full border-2 border-orange-400/50 group-hover:border-orange-400 transition-all ring-2 ring-gray-900 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                
                <div className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-gray-800/50 rounded-2xl shadow-2xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden backdrop-blur-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>
                  
                  <div className="p-4 border-b border-gray-800/50">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="font-semibold text-white mt-0.5">{user.name}</p>
                  </div>
                  
                  <div className="py-2">
                    <Link 
                      to="/add-food" 
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 hover:text-white transition-all group/item"
                    >
                      <svg className="w-4 h-4 text-orange-400 group-hover/item:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add Food</span>
                    </Link>
                    
                    <Link 
                      to="/manage-foods" 
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 hover:text-white transition-all group/item"
                    >
                      <svg className="w-4 h-4 text-yellow-400 group-hover/item:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span>Manage My Foods</span>
                    </Link>
                    
                    <Link 
                      to="/my-requests" 
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 hover:text-white transition-all group/item"
                    >
                      <svg className="w-4 h-4 text-green-400 group-hover/item:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>My Food Requests</span>
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-800/50 p-2">
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all group/item"
                    >
                      <svg className="w-4 h-4 group-hover/item:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            className="md:hidden relative p-2 rounded-xl text-orange-400 hover:bg-white/5 focus:outline-none transition-all" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {isMenuOpen ? (
                <FaTimes className="text-2xl animate-in spin-in-90 duration-300" />
              ) : (
                <FaBars className="text-2xl animate-in spin-in-90 duration-300" />
              )}
            </div>
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-2 bg-gradient-to-b from-gray-900/95 to-black/95 border-t border-gray-800/50 backdrop-blur-xl">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)} 
            className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 transition-all font-medium"
          >
            Home
          </Link>
          
          <Link 
            to="/available-foods" 
            onClick={() => setIsMenuOpen(false)} 
            className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 transition-all font-medium"
          >
            Available Foods
          </Link>

          {!isLoggedIn ? (
            <Link 
              to="/login" 
              onClick={() => setIsMenuOpen(false)} 
              className="block mt-4 px-6 py-3 rounded-xl font-bold text-center text-black bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 hover:from-orange-400 hover:via-yellow-300 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/30"
            >
              Login
            </Link>
          ) : (
            <div className="space-y-2 pt-4 border-t border-gray-800/50 mt-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl">
                <div className="relative">
                  <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    className="w-11 h-11 rounded-full border-2 border-orange-400/50 ring-2 ring-gray-900" 
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Signed in as</p>
                  <p className="font-semibold text-white">{user.name}</p>
                </div>
              </div>
              
              <Link 
                to="/add-food" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 transition-all"
              >
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Food</span>
              </Link>
              
              <Link 
                to="/manage-foods" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 transition-all"
              >
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Manage My Foods</span>
              </Link>
              
              <Link 
                to="/my-requests" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 transition-all"
              >
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>My Food Requests</span>
              </Link>
              
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}