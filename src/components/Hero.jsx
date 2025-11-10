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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/70 to-black/90" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
          Share Food, Spread Love
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-6">
          PlateShare connects people with surplus food to those who need it.
          Together, let’s fight food waste and feed more.
        </p>
        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-black font-bold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          View All Foods
        </button>
      </div>
    </div>
  );
}
