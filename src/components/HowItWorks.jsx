import { FaUtensils, FaSearch, FaHandHolding } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaUtensils size={40} />,
      title: "Post Food",
      description:
        "Share your surplus food by posting it on PlateShare. Let the community know what's available.",
      color: "from-orange-500 to-yellow-500",
      step: "01"
    },
    {
      icon: <FaSearch size={40} />,
      title: "Find Food",
      description:
        "Browse available food items in your area. Quickly find meals that you or others need.",
      color: "from-yellow-500 to-orange-400",
      step: "02"
    },
    {
      icon: <FaHandHolding size={40} />,
      title: "Collect Food",
      description:
        "Coordinate with donors to collect the food safely and enjoyably, reducing waste and helping the community.",
      color: "from-orange-400 to-yellow-400",
      step: "03"
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-yellow-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse"></span>
            <span className="text-orange-300 text-sm font-semibold tracking-wide">Simple & Easy</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500">
              How It Works
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent -translate-y-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500`}></div>
              
              <div className="relative flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-800 group-hover:border-orange-500/50 transition-all duration-500 shadow-2xl group-hover:shadow-orange-500/20 transform group-hover:scale-105">
                
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-4 border-gray-900 group-hover:rotate-12 transition-transform duration-500`}>
                    <span className="text-black font-bold text-sm">{step.step}</span>
                  </div>
                </div>

                <div className={`w-20 h-20 mb-6 mt-4 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <span className="text-white">
                    {step.icon}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-400 transition-all duration-300">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors">
                  {step.description}
                </p>

                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${step.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-12 lg:w-24 h-0.5">
                  <div className={`w-full h-full bg-gradient-to-r ${step.color} opacity-30`}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm sm:text-base mb-6">
            Ready to make a difference?
          </p>
          <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-black font-bold text-base rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Get Started Now
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}