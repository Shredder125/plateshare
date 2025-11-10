import { Link } from "react-router-dom";

export default function FoodCard({ food }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={food.foodImage || "https://via.placeholder.com/400x250"}
        alt={food.foodName}
        className="h-48 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold mb-2 text-white">{food.foodName}</h3>
        <p className="text-gray-300 mb-2">{food.foodQuantity}</p>
        <p className="text-gray-400 mb-4">{food.pickupLocation}</p>
        <Link
          to={`/food/${food._id}`}
          className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold hover:from-orange-500 hover:to-yellow-500 transition"
        >
          View Details!
        </Link>
      </div>
    </div>
  );
}
