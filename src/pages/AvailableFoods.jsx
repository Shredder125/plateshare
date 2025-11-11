import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

export default function AvailableFoods() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/foods");
      const data = await res.json();
      setFoods(data);
      setFilteredFoods(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    let tempFoods = [...foods];

    if (search.trim()) {
      tempFoods = tempFoods.filter((food) =>
        (food.foodName || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (locationFilter.trim()) {
      tempFoods = tempFoods.filter((food) =>
        (food.pickupLocation || "").toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredFoods(tempFoods);
  }, [search, locationFilter, foods]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-orange-400 text-xl font-semibold">
        Loading available foods...
      </div>
    );
  }

  if (!filteredFoods.length) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-300 text-lg">
        No foods match your search or filters.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center">
        Available Foods
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by food name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 outline-none"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
}
