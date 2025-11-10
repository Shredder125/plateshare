import { FaUtensils, FaSearch, FaHandHolding } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaUtensils size={40} className="text-orange-400 mb-4" />,
      title: "Post Food",
      description:
        "Share your surplus food by posting it on PlateShare. Let the community know what’s available.",
    },
    {
      icon: <FaSearch size={40} className="text-orange-400 mb-4" />,
      title: "Find Food",
      description:
        "Browse available food items in your area. Quickly find meals that you or others need.",
    },
    {
      icon: <FaHandHolding size={40} className="text-orange-400 mb-4" />,
      title: "Collect Food",
      description:
        "Coordinate with donors to collect the food safely and enjoyably, reducing waste and helping the community.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                {step.icon}
                <h3 className="text-xl font-bold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
