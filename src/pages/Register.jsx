import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaHandshake, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "../App";

const images = [
  "https://i.ibb.co/GvJG4qn8/download-9.jpg",
  "https://i.ibb.co/KpQ1HCGH/download-8.jpg",
  "https://i.ibb.co/V0BM56Tx/Happy-Kids.jpg",
  "https://i.ibb.co/0pw58Pb0/download-7.jpg",
  "https://i.ibb.co/jdNkXJr/A-Life-Changing-Experience-in-Uganda-with-the-Cotton-On-Foundation.jpg",
  "https://i.ibb.co/svKQyhmK/Lockdown-Community-Project-High-Five.jpg",
  "https://i.ibb.co/pj4Ljxw0/Google-Lens.jpg",
  "https://i.ibb.co/fd9yKVky/jj.jpg",
  "https://i.ibb.co/TBtNRs7C/download-6.jpg",
  "https://i.ibb.co/wrY8sYYg/download-5.jpg",
  "https://i.ibb.co/SXMvKJY6/Every-little-helps.jpg",
];

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;

    if (!uppercase || !lowercase || !minLength) {
      toast.error("Password must include uppercase, lowercase, and be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const provider = new GoogleAuthProvider();

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col overflow-hidden">
      <div className="flex-shrink-0 py-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
        <Marquee speed={80} gradient={false}>
          {images.map((img, idx) => (
            <div key={idx} className="mx-3 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
              <img
                src={img}
                alt={`community-${idx}`}
                className="relative h-24 w-32 rounded-2xl object-cover shadow-lg border border-gray-800 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FaHandshake className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                PlateShare
              </span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-20"></div>
            
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-800">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-t-2xl"></div>

              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 mb-2">
                  Join PlateShare
                </h1>
                <p className="text-gray-400 text-sm">Start making a difference today</p>
              </div>

              <button
                onClick={handleGoogleAuth}
                className="flex items-center justify-center gap-3 w-full py-3 mb-5 rounded-lg bg-white text-gray-800 hover:bg-gray-100 transition font-medium shadow-md text-sm sm:text-base"
              >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-gray-500 text-xs">OR</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </div>

                <div className="relative group">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </div>

                <div className="relative group">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </div>

                <div className="text-xs text-gray-400 space-y-1 mt-1 ml-1 break-words max-w-full">
                  <p className={/[A-Z]/.test(formData.password) ? "text-green-400" : "text-red-400"}>
                    • Must contain an uppercase letter
                  </p>
                  <p className={/[a-z]/.test(formData.password) ? "text-green-400" : "text-red-400"}>
                    • Must contain a lowercase letter
                  </p>
                  <p className={formData.password.length >= 6 ? "text-green-400" : "text-red-400"}>
                    • Must be at least 6 characters
                  </p>
                </div>

                <div className="relative group">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold shadow-lg hover:from-orange-600 hover:to-yellow-600 transition-all text-sm sm:text-base mt-6"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-5 text-center text-gray-400 text-xs sm:text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-400 font-semibold hover:text-orange-300 transition">
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 py-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
        <Marquee speed={80} gradient={false} direction="right">
          {images.map((img, idx) => (
            <div key={idx} className="mx-3 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
              <img
                src={img}
                alt={`community-${idx}`}
                className="relative h-24 w-32 rounded-2xl object-cover shadow-lg border border-gray-800 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}