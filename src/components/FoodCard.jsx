export default function FoodCard({ food }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <div className="h-48 sm:h-56 md:h-60 w-full overflow-hidden rounded-t-2xl">
        <img
          src={food.foodImage || "https://via.placeholder.com/400x250"}
          alt={food.foodName}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 text-white line-clamp-2">
            {food.foodName}
          </h3>
          <p className="text-gray-300 mb-1 text-sm sm:text-base">{food.foodQuantity}</p>

          <p className="text-gray-400 mb-1 text-sm sm:text-base hidden md:block">{food.pickupLocation}</p>
          <p className="text-gray-400 mb-1 text-sm sm:text-base hidden md:block">
            Expires: {new Date(food.expireDate).toLocaleDateString()}
          </p>
          <p className="text-gray-400 text-sm sm:text-base line-clamp-3 hidden md:block">
            {food.additionalNotes}
          </p>
        </div>

        <button className="mt-3 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold text-sm sm:text-base hover:from-orange-400 hover:to-yellow-400 transition w-full">
          View Details
        </button>
      </div>
    </div>
  );
}
