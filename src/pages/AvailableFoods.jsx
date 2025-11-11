import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

export default function AvailableFoods() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/foods");
        const data = await res.json();
        setFoods(data);
        setFilteredFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };
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

    if (showAvailableOnly) {
      tempFoods = tempFoods.filter(
        (food) => (food.food_status || "").toLowerCase() === "available"
      );
    }

    setFilteredFoods(tempFoods);
  }, [search, locationFilter, showAvailableOnly, foods]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-400 text-xl font-semibold animate-pulse">Loading delicious foods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 animate-gradient">
              Available Foods
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Discover fresh meals ready for pickup. Join us in reducing food waste and helping those in need.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>{foods.filter(f => (f.food_status || "").toLowerCase() === "available").length} Available</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <span>{foods.length} Total Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl border border-gray-800/50 p-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Input */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by food name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-800/80 border border-gray-700 text-gray-200 placeholder-gray-500 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Location Filter */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-800/80 border border-gray-700 text-gray-200 placeholder-gray-500 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Available Only Toggle */}
            <label className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gray-800/80 border border-gray-700 cursor-pointer hover:border-orange-500/50 transition-all group">
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                className="w-5 h-5 rounded border-gray-600 text-orange-500 focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
              />
              <span className="text-gray-300 font-medium whitespace-nowrap group-hover:text-orange-400 transition-colors">
                Available Only
              </span>
            </label>
          </div>

          {/* Active Filters Display */}
          {(search || locationFilter || showAvailableOnly) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-400">Active filters:</span>
              {search && (
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm border border-orange-500/30 flex items-center gap-2">
                  Search: "{search}"
                  <button onClick={() => setSearch("")} className="hover:text-orange-300">×</button>
                </span>
              )}
              {locationFilter && (
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm border border-orange-500/30 flex items-center gap-2">
                  Location: "{locationFilter}"
                  <button onClick={() => setLocationFilter("")} className="hover:text-orange-300">×</button>
                </span>
              )}
              {showAvailableOnly && (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm border border-green-500/30 flex items-center gap-2">
                  Available only
                  <button onClick={() => setShowAvailableOnly(false)} className="hover:text-green-300">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearch("");
                  setLocationFilter("");
                  setShowAvailableOnly(false);
                }}
                className="text-sm text-gray-400 hover:text-orange-400 underline transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {!filteredFoods.length ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-400">No foods found</h3>
            <p className="text-gray-500 text-center max-w-md">
              We couldn't find any foods matching your filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setLocationFilter("");
                setShowAvailableOnly(false);
              }}
              className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold hover:from-orange-400 hover:to-yellow-400 transition-all shadow-lg hover:shadow-orange-500/50"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}