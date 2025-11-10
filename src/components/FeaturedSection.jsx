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
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
          Featured Foods
        </h2>

        {foods.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center text-lg">
            No foods available right now.
          </p>
        )}
      </div>
    </section>
  );
}
