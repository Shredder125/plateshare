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
    <section className="relative w-full overflow-hidden h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-screen flex items-center justify-center">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${index === current ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] leading-tight">
          Share Food, Spread Love
        </h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xl leading-relaxed">
          PlateShare connects people with surplus food to those who need it. Together, let’s fight food waste and feed more.
        </p>
        <button
          onClick={() => navigate("/available-foods")}
          className="mt-4 sm:mt-6 px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 text-black font-semibold text-sm sm:text-base rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          View All Foods
        </button>
      </div>
    </section>
  );
}
