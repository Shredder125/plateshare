import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaHandshake, FaEnvelope, FaLock } from "react-icons/fa";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

export default function Login() {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;

    if (!uppercase || !lowercase || !minLength) {
      toast.error("Password must include uppercase, lowercase, and be at least 6 characters.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
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
    <div className="min-h-screen w-full flex bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
          >
            <img src={img} alt={`community-${index}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/80"></div>
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-between p-12 z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <FaHandshake className="text-white text-2xl" />
            </div>
            <span className="text-3xl font-extrabold text-white drop-shadow-lg">PlateShare</span>
          </Link>

          <div className="space-y-6">
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight drop-shadow-2xl">
              Share Food,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Change Lives</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-md drop-shadow-lg">
              Join thousands of people making a difference in their communities through food sharing
            </p>

            <div className="flex gap-3 pt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-1 rounded-full transition-all ${index === currentImage ? "w-12 bg-gradient-to-r from-orange-500 to-yellow-500" : "w-8 bg-white/30 hover:bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <FaHandshake className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">PlateShare</span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>

            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-800">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-t-3xl"></div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
                <p className="text-gray-400 text-sm">Continue your journey of sharing and caring</p>
              </div>

              <button
                onClick={handleGoogleAuth}
                className="flex items-center justify-center gap-3 w-full py-3 mb-6 rounded-xl bg-white text-gray-800 hover:bg-gray-100 transition-all font-semibold shadow-lg hover:scale-105"
              >
                <FcGoogle size={24} />
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                <span className="text-gray-500 text-xs font-medium">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Sign In
                  </span>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 font-bold hover:from-orange-300 hover:to-yellow-300 transition-all">
                  Create Account here.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}