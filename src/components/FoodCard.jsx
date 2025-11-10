export default function FoodCard({ food }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col">
      <img
        src={food.foodImage || "https://via.placeholder.com/400x250"}
        alt={food.foodName}
        className="h-56 w-full object-cover"
      />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-2 text-white">{food.foodName}</h3>
        <p className="text-gray-300 mb-2">{food.foodQuantity}</p>
        <p className="text-gray-400 mb-4">{food.pickupLocation}</p>
        <p className="text-gray-400 mb-4">
          Expires: {new Date(food.expireDate).toLocaleDateString()}
        </p>
        <p className="text-gray-400 mb-4">{food.additionalNotes}</p>
        <button className="mt-auto px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold hover:from-orange-400 hover:to-yellow-400 transition">
          View Details
        </button>
      </div>
    </div>
  );
}
