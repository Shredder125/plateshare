import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://i.pinimg.com/1200x/7b/4c/a1/7b4ca11a68d9dc2bd3a239e3a6c7e0e9.jpg",
  "https://i.pinimg.com/736x/71/d8/9d/71d89d826b4ba5d03ad90541014ab080.jpg",
  "https://i.pinimg.com/736x/c6/0d/94/c60d94adbd71de1f93b69992d4c3fff3.jpg",
  "https://i.pinimg.com/736x/f2/c9/cf/f2c9cfe795b9ac59851d15c5cb90a400.jpg",
  "https://i.pinimg.com/736x/f3/3c/8b/f33c8b8f52fdc7448e4d167fa1ef62a8.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen flex items-center justify-center">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-yellow-900/20" />

      <div className="absolute inset-0 flex items-end justify-center pb-8">
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === current
                  ? "w-12 bg-gradient-to-r from-orange-500 to-yellow-500"
                  : "w-8 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 max-w-4xl space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 backdrop-blur-sm mt-8">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse"></span>
          <span className="text-orange-300 text-sm font-semibold tracking-wide">
            Fighting Food Waste Together
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-white drop-shadow-2xl">
            Share Food,
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 mt-2 drop-shadow-2xl">
            Spread Love
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          PlateShare connects people with surplus food to those who need it.
          <span className="block mt-2 text-orange-300 font-semibold">
            Together, let's fight food waste and feed more.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <button
            onClick={() => navigate("/available-foods")}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-black font-bold text-base sm:text-lg rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Foods
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => navigate("/available-foods")}
            className="group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-base sm:text-lg rounded-full hover:bg-white/20 hover:border-orange-400 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Learn More
              <svg
                className="w-5 h-5 transform group-hover:rotate-45 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-8 sm:gap-12 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500"></div>
      </div>

      <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  );
}
