import { useState, useEffect } from "react";

const images = [
  "https://i.pinimg.com/1200x/7b/4c/a1/7b4ca11a68d9dc2bd3a239e3a6c7e0e9.jpg",
  "https://i.pinimg.com/736x/71/d8/9d/71d89d826b4ba5d03ad90541014ab080.jpg",
  "https://i.pinimg.com/736x/c6/0d/94/c60d94adbd71de1f93b69992d4c3fff3.jpg",
  "https://i.pinimg.com/736x/f2/c9/cf/f2c9cfe795b9ac59851d15c5cb90a400.jpg",
  "https://i.pinimg.com/736x/f3/3c/8b/f33c8b8f52fdc7448e4d167fa1ef62a8.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % images.length;
        setNextIndex((next + 1) % images.length);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${images[current]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.1)",
            opacity: 1,
          }}
        />
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${images[nextIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1)",
            opacity: 0,
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/95" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-600/40 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-yellow-600/40 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.7s" }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-orange-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="absolute inset-0 flex items-end justify-center pb-12">
        <div className="flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-500 ease-out rounded-full ${
                index === current
                  ? "w-16 h-3 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500"
                  : "w-3 h-3 bg-white/40 hover:bg-white/70"
              }`}
              style={{
                boxShadow:
                  index === current
                    ? "0 0 20px rgba(249, 115, 22, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.1)"
                    : "none",
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-96 h-96 border-2 border-orange-500/20 rounded-full" style={{ animation: "spin 20s linear infinite" }} />
        <div className="absolute w-80 h-80 border-2 border-yellow-500/10 rounded-full" style={{ animation: "spin 30s linear infinite reverse" }} />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 max-w-4xl space-y-8 sm:space-y-10">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/30 to-yellow-500/30 border border-orange-400/50 backdrop-blur-xl shadow-lg" style={{ boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)" }}>
          <span className="relative flex w-3 h-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-orange-500 to-yellow-500"></span>
          </span>
          <span className="text-orange-200 text-sm font-bold tracking-widest uppercase">
            Fighting Food Waste Together
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter" style={{ animation: "fadeInUp 1s ease-out" }}>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-200 to-white">
              Share Food,
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 mt-3">
              Spread Love
            </span>
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-3xl leading-relaxed font-light" style={{ animation: "fadeInUp 1s ease-out 0.3s both" }}>
          PlateShare connects people with surplus food to those who need it.
          <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 font-semibold">
            Together, let's fight food waste and feed more.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6" style={{ animation: "fadeInUp 1s ease-out 0.5s both" }}>
          <button
            onClick={() => window.location.href = "/available-foods"}
            className="group relative px-10 py-4 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 text-black font-black text-lg sm:text-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden uppercase tracking-wider"
            style={{ boxShadow: "0 0 30px rgba(249, 115, 22, 0.4)" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              View All Foods
              <svg
                className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => window.location.href = "/available-foods"}
            className="group px-10 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white font-bold text-lg sm:text-xl rounded-full hover:bg-white/20 hover:border-orange-400 transition-all duration-300 hover:scale-110 uppercase tracking-wider"
            style={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}
          >
            <span className="flex items-center gap-3">
              Learn More
              <svg
                className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>



      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}