import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const images = [
  "https://i.pinimg.com/1200x/1c/9p/wm/1c9pwmYOr.jpg",
  "https://i.pinimg.com/1200x/ud/G4/QTIws.jpg",
  "https://i.pinimg.com/1200x/LL/1e/OEwFx.jpg",
  "https://i.pinimg.com/1200x/7q/I7/FIIZR.jpg",
  "https://i.pinimg.com/1200x/2Z/h7/gMvTa.jpg",
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
    // handle Google authentication
    console.log("Google auth clicked");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      
      <div className="md:w-1/2 grid grid-cols-2 grid-rows-3 gap-2 p-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "120px",
            }}
          />
        ))}
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
            Create Account
          </h2>

          <button
            onClick={handleGoogleAuth}
            className="flex items-center justify-center gap-3 w-full py-2 mb-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition font-medium"
          >
            <FcGoogle size={24} /> Sign up with Google
          </button>

          <div className="flex items-center my-3">
            <hr className="flex-1 border-gray-600" />
            <span className="px-2 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold hover:from-orange-400 hover:to-yellow-400 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-orange-400 hover:text-yellow-400">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
