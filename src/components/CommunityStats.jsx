import { useEffect, useState, useRef } from "react";
import { FaUtensils, FaHandsHelping, FaUsers, FaTruck } from "react-icons/fa";

const statsData = [
  {
    icon: <FaUtensils />,
    value: 1200,
    label: "Meals Shared",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: <FaHandsHelping />,
    value: 450,
    label: "Active Donors",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <FaUsers />,
    value: 80,
    label: "Community Partners",
    color: "from-orange-400 to-yellow-400",
  },
  {
    icon: <FaTruck />,
    value: 6000,
    label: "Meals Delivered",
    color: "from-yellow-400 to-orange-400",
  },
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
        <style>{`
          @keyframes rotate-gradient {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .rotating-gradient {
            animation: rotate-gradient 3s linear infinite;
          }
          @keyframes pulse-glow {
            0%, 100% {
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
          }
          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
        `}</style>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 backdrop-blur-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse"></span>
              <span className="text-orange-300 text-sm font-semibold tracking-wide">
                Making a Difference
              </span>
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
                <div className="absolute -inset-1 rounded-3xl overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} blur-xl opacity-60 pulse-glow`}
                  ></div>
                  <div
                    className={`absolute -inset-[200%] bg-gradient-to-r ${stat.color} opacity-75 rotating-gradient`}
                  ></div>
                </div>

                <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-gray-800 group-hover:border-orange-500/50 transform group-hover:scale-105 transition-all duration-500 shadow-2xl">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div
                      className={`absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg_340deg,var(--gradient-color)_340deg_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotating-gradient`}
                      style={{
                        "--gradient-color": stat.color.includes("orange-500")
                          ? "#f97316"
                          : "#eab308",
                      }}
                    ></div>
                  </div>

                  <div
                    className={`relative w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} blur-lg opacity-50 group-hover:opacity-100 pulse-glow`}
                    ></div>
                    <span className="relative text-white text-4xl">
                      {stat.icon}
                    </span>
                  </div>

                  <h3
                    className={`relative text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                  >
                    <AnimatedNumber value={stat.value} trigger={inView} />
                    <span className="text-4xl">+</span>
                  </h3>

                  <p className="relative text-gray-300 font-semibold text-base text-center">
                    {stat.label}
                  </p>

                  <div
                    className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${stat.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 shadow-lg`}
                  ></div>

                  <div className="absolute -inset-2 rounded-3xl overflow-hidden pointer-events-none">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              Join our growing community and help us reach even more people in
              need
            </p>
          </div>
        </div>
      </section>
  );
}
