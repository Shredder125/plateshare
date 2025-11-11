import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FoodDetails() {
  const { _id } = useParams(); // This gets the ID from the URL
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        console.log("Fetching food with ID:", _id); // Debug log
        const res = await fetch(`http://localhost:5000/api/foods/${_id}`);
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Food not found");
        }
        
        const data = await res.json();
        console.log("Fetched food data:", data); // Debug log
        setFood(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching food:", err);
      } finally {
        setLoading(false);
      }
    };

    if (_id) {
      fetchFood();
    }
  }, [_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-orange-400 text-xl font-semibold">
        Loading food details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-300 text-lg gap-4">
        <p className="text-red-400 text-2xl font-bold">Error</p>
        <p>{error}</p>
        <p className="text-sm text-gray-500">Food ID: {_id}</p>
        <button 
          onClick={() => window.history.back()} 
          className="px-6 py-2 bg-orange-500 text-black rounded-full hover:bg-orange-400 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-300 text-lg">
        No food data available
      </div>
    );
  }

  const isAvailable = (food.food_status || "").toLowerCase() === "available";

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex justify-center">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img
            src={food.foodImage || "https://via.placeholder.com/600x400"}
            alt={food.foodName}
            className="h-full w-full object-cover"
          />
          {isAvailable && (
            <span
              className="absolute top-4 right-4 w-4 h-4 rounded-full bg-green-500 ring-2 ring-white shadow-md"
              title="Available"
            ></span>
          )}
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-400">
            {food.foodName}
          </h1>
          <p className="text-lg sm:text-2xl font-semibold text-yellow-400">
            Quantity: {food.foodQuantity}
          </p>
          <p className="text-lg sm:text-xl font-semibold text-white">
            Donator: {food.donatorName || "Anonymous"}
          </p>
          <p className="text-gray-300 text-sm sm:text-base">
            Pickup Location: {food.pickupLocation || "N/A"}
          </p>
          <p className="text-gray-300 text-sm sm:text-base">
            Expires On: {food.expireDate ? new Date(food.expireDate).toLocaleDateString() : "N/A"}
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Additional Notes: {food.additionalNotes || "None"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Status: <span className={isAvailable ? "text-green-400" : "text-red-400"}>
              {food.food_status || "Unknown"}
            </span>
          </p>

          <button 
            className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold text-lg hover:from-orange-400 hover:to-yellow-400 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isAvailable}
          >
            {isAvailable ? "Request Food" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
}