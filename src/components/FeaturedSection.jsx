import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodCard from "./FoodCard";

export default function FeaturedSection() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/foods/featured");
        const data = await res.json();
        const sorted = data
          .map((food) => ({
            ...food,
            quantityNumber: parseInt(food.foodQuantity.match(/\d+/)?.[0] || 0),
          }))
          .sort((a, b) => b.quantityNumber - a.quantityNumber)
          .slice(0, 6);

        setFoods(sorted);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  return (
      <section className="py-10 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
            Featured Foods
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {foods.length > 0 ? (
              foods.map((food) => <FoodCard key={food._id} food={food} />)
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No foods available right now.
              </p>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/available-foods")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold hover:from-orange-400 hover:to-yellow-400 transition duration-300 shadow-md"
            >
              Show All
            </button>
          </div>
        </div>
      </section>
  );
}
