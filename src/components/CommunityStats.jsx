import { useEffect, useState, useRef } from "react";
import { FaUtensils, FaHandsHelping, FaUsers, FaTruck } from "react-icons/fa";

const statsData = [
  { icon: <FaUtensils />, value: 1200, label: "Meals Shared", color: "from-orange-500 to-yellow-500" },
  { icon: <FaHandsHelping />, value: 450, label: "Active Donors", color: "from-yellow-500 to-orange-500" },
  { icon: <FaUsers />, value: 80, label: "Community Partners", color: "from-orange-400 to-yellow-400" },
  { icon: <FaTruck />, value: 6000, label: "Meals Delivered", color: "from-yellow-400 to-orange-400" },
];

function AnimatedNumber({ value, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
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
  }, [value, trigger]);

  return <span>{count.toLocaleString()}</span>;
}

export default function CommunityStats() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse"></span>
            <span className="text-orange-300 text-sm font-semibold tracking-wide">Making a Difference</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500">
              Our Impact
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Together, we're building a community that cares
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="group relative"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
              
              <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-800 hover:border-orange-500/50 transform hover:scale-105 transition-all duration-500 shadow-2xl">
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                  <span className="text-white text-3xl">
                    {stat.icon}
                  </span>
                </div>
                
                <h3 className={`text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  <AnimatedNumber value={stat.value} trigger={inView} />
                  <span className="text-3xl">+</span>
                </h3>
                
                <p className="text-gray-300 font-semibold text-base text-center">
                  {stat.label}
                </p>

                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            Join our growing community and help us reach even more people in need
          </p>
        </div>
      </div>
    </section>
  );
}