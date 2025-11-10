import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

export default function FeaturedSection() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/foods/featured");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };

    fetchFoods();
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
          Featured Foods
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {foods.length > 0 ? (
            foods.map((food) => <FoodCard key={food._id} food={food} />)
          ) : (
            <p className="text-gray-400 col-span-full">No foods available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
