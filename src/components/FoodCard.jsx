import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function FoodCard({ food }) {
  const navigate = useNavigate();
  const isAvailable = (food.food_status || "").toLowerCase() === "available";

  const handleViewDetails = () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/food/${food._id}`);
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:shadow-orange-500/20 transition-all duration-500 flex flex-col border border-gray-800 hover:border-orange-500/50">
      <div className="h-48 sm:h-56 md:h-60 w-full overflow-hidden rounded-t-3xl relative">
        <img
          src={food.foodImage || "https://via.placeholder.com/400x250"}
          alt={food.foodName}
          className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
        {isAvailable && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-white text-xs font-semibold">Available</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-xl sm:text-2xl font-bold text-white line-clamp-2 drop-shadow-lg">
            {food.foodName}
          </h3>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">
              {(food.donatorName || "A")[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Donated by</p>
            <p className="text-orange-400 font-semibold text-sm">
              {food.donatorName || "Anonymous"}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-300">
            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{food.foodQuantity}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 hidden md:flex">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm line-clamp-1">{food.pickupLocation || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 hidden md:flex">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">
              Expires: {food.expireDate ? new Date(food.expireDate).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>
        <button
          onClick={handleViewDetails}
          className="mt-auto w-full py-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 text-black font-bold text-sm sm:text-base hover:from-orange-400 hover:via-yellow-500 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="flex items-center justify-center gap-2">
            View Details
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
