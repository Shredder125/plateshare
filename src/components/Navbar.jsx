import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHandshake, FaBars, FaTimes } from "react-icons/fa";
import { auth, provider } from "../firebase"; // your firebase setup
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || currentUser.email,
          profilePic: currentUser.photoURL || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          uid: currentUser.uid,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
    navigate("/"); // optional: redirect to home
  };

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Available Foods", to: "/available-foods" },
  ];

  const userLinks = [
    { name: "Add Food", to: "/add-food", color: "text-orange-400" },
    { name: "Manage My Foods", to: "/manage-foods", color: "text-yellow-400" },
    { name: "My Food Requests", to: "/my-requests", color: "text-green-400" },
  ];

  return (
    <nav className="relative z-50">
      {/* Animated gradient waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 opacity-20 animate-wave slow-wave"></div>
        <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 opacity-15 animate-wave reverse-wave"></div>
      </div>

      {/* Navbar Content */}
      <div className="relative backdrop-blur-xl bg-gradient-to-r from-gray-950/95 via-gray-900/95 to-black/95 text-white shadow-2xl shadow-orange-500/10 sticky top-0 z-50 border-b border-gray-800/50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-2.5 rounded-xl border border-orange-500/30 group-hover:border-orange-400 transition-all duration-300">
                  <FaHandshake className="text-orange-400 text-2xl group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 group-hover:from-orange-300 group-hover:via-yellow-300 group-hover:to-orange-400 transition-all duration-500">
                PlateShare
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 relative group overflow-hidden"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
              ))}

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="ml-4 px-6 py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 hover:from-orange-400 hover:via-yellow-300 hover:to-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 relative overflow-hidden group"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-2 px-6 py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50 relative overflow-hidden group"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative group ml-4">
                  <div className="relative cursor-pointer">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <img 
                      src={user.profilePic} 
                      alt="Profile" 
                      className="relative w-11 h-11 rounded-full border-2 border-orange-400/50 group-hover:border-orange-400 transition-all ring-2 ring-gray-900 group-hover:scale-110 duration-300" 
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                  </div>
                  
                  {/* Avatar Dropdown */}
                  <div className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-gray-800/50 rounded-2xl shadow-2xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 animate-gradient-x"></div>
                    <div className="p-4 border-b border-gray-800/50">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="font-semibold text-white mt-0.5">{user.name}</p>
                    </div>
                    <div className="py-2">
                      {userLinks.map((item) => (
                        <Link 
                          key={item.name}
                          to={item.to} 
                          className={`flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 hover:text-white transition-all duration-300 group/item`}
                        >
                          <span className={item.color}>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-800/50 p-2">
                      <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all duration-300 group/item"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden relative p-2 rounded-xl text-orange-400 hover:bg-white/5 focus:outline-none transition-all duration-300" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl animate-spin duration-500" />
              ) : (
                <FaBars className="text-2xl animate-spin duration-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-2 bg-gradient-to-b from-gray-900/95 to-black/95 border-t border-gray-800/50 backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.to} 
                onClick={() => setIsMenuOpen(false)} 
                className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 transition-all duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mt-4 px-6 py-3 rounded-xl font-bold text-center text-black bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 hover:from-orange-400 hover:via-yellow-300 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/30 w-full"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mt-2 px-6 py-3 rounded-xl font-bold text-center text-black bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 transition-all shadow-lg shadow-pink-500/30 w-full"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="space-y-2 pt-4 border-t border-gray-800/50 mt-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl">
                  <div className="relative">
                    <img src={user.profilePic} alt="Profile" className="w-11 h-11 rounded-full border-2 border-orange-400/50 ring-2 ring-gray-900" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="font-semibold text-white">{user.name}</p>
                  </div>
                </div>

                {userLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}

                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extra Tailwind CSS Animations */}
      <style>
        {`
          .animate-wave {
            animation: wave 20s linear infinite;
          }
          .reverse-wave {
            animation-direction: reverse;
          }
          .slow-wave {
            animation-duration: 40s;
          }
          @keyframes wave {
            0% { transform: translateX(0) translateY(0) rotate(0deg); }
            50% { transform: translateX(-25%) translateY(10%) rotate(2deg); }
            100% { transform: translateX(0) translateY(0) rotate(0deg); }
          }
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </nav>
  );
}
