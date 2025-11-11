import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Marquee from "react-fast-marquee";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleGoogleAuth = () => {
    console.log("Google auth clicked");
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-4 gap-4
      bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white"
    >

      <Marquee direction="left" speed={100} pauseOnHover gradient={false} loop={0}>
        {[...images, ...images].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`img-${idx}`}
            className="h-20 w-auto rounded-xl object-cover mx-4"
          />
        ))}
      </Marquee>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-3 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
          Create Account
        </h2>

        <button
          onClick={handleGoogleAuth}
          className="flex items-center justify-center gap-3 w-full py-2 mb-3 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium text-sm sm:text-base"
        >
          <FcGoogle size={22} /> Sign up with Google
        </button>

        <div className="flex items-center my-2">
          <hr className="flex-1 border-white/20" />
          <span className="px-2 text-gray-200 text-xs sm:text-sm">or</span>
          <hr className="flex-1 border-white/20" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            className="w-full py-2 sm:py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold hover:from-orange-400 hover:to-yellow-400 transition text-sm sm:text-base"
          >
            Register
          </button>
        </form>

        <p className="mt-3 text-center text-gray-200 text-xs sm:text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-orange-400 hover:text-yellow-400">
            Login
          </a>
        </p>
      </div>

      <Marquee direction="right" speed={100} pauseOnHover gradient={false} loop={0}>
        {[...images, ...images].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`img-${idx}`}
            className="h-20 w-auto rounded-xl object-cover mx-4"
          />
        ))}
      </Marquee>
    </div>
  );
}
