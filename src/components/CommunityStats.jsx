import { useEffect, useState } from "react";
import { FaUtensils, FaHandsHelping, FaUsers, FaTruck } from "react-icons/fa";

const statsData = [
  { icon: <FaUtensils />, value: 1200, label: "Meals Shared" },
  { icon: <FaHandsHelping />, value: 450, label: "Active Donors" },
  { icon: <FaUsers />, value: 80, label: "Community Partners" },
  { icon: <FaTruck />, value: 6000, label: "Meals Delivered" },
];

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = Math.ceil(end / (duration / 30));

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(start);
    }, 30);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300 animate-gradient-x">
      {count.toLocaleString()}
    </span>
  );
}

export default function CommunityStats() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-r from-gray-900 via-gray-800 to-black opacity-40 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 animate-gradient-x">
          Our Impact
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl hover:scale-105 transform transition-all duration-500"
            >
              <div className="text-orange-400 mb-3 text-4xl sm:text-5xl animate-pulse">{stat.icon}</div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-1">
                <AnimatedNumber value={stat.value} />
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
