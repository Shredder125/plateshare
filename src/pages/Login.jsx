import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://i.pinimg.com/1200x/7b/4c/a1/7b4ca11a68d9dc2bd3a239e3a6c7e0e9.jpg",
  "https://i.pinimg.com/736x/71/d8/9d/71d89d826b4ba5d03ad90541014ab080.jpg",
  "https://i.pinimg.com/736x/c6/0d/94/c60d94adbd71de1f93b69992d4c3fff3.jpg",
  "https://i.pinimg.com/736x/f2/c9/cf/f2c9cfe795b9ac59851d15c5cb90a400.jpg",
  "https://i.pinimg.com/736x/f3/3c/8b/f33c8b8f52fdc7448e4d167fa1ef62a8.jpg",
];

export default function Login() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-gray-900/80 rounded-3xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
          Welcome Back !
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
          />

          <button className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold text-lg shadow-lg hover:from-orange-400 hover:to-yellow-400 transition-all duration-300">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          New here?{" "}
          <Link
            to="/register"
            className="text-orange-400 font-semibold hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
