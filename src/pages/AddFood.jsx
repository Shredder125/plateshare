import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useToast } from "../App";

export default function AddFood() {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    foodQuantity: "",
    pickupLocation: "",
    expireDate: "",
    additionalNotes: "",
    donatorName: "",
    donatorEmail: "",
    donatorImage: "",
    food_status: "available",
  });

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData((prev) => ({
          ...prev,
          donatorName: currentUser.displayName || "Anonymous",
          donatorEmail: currentUser.email,
          donatorImage: currentUser.photoURL || "https://via.placeholder.com/150",
        }));
      } else {
        toast.error("You must be logged in to add food.");
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate, toast]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add food.");

      toast.success("Food item added successfully!");
      navigate("/available-foods");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 sm:p-10 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-6 text-center">
          Add a New Food Item
        </h1>

       
        <div className="p-4 border border-gray-700 rounded-xl bg-gray-800/50 mb-6">
          <h2 className="text-lg font-semibold text-orange-400 mb-4">Your Information (Donator)</h2>
          <div className="flex items-center gap-4">
            <img src={formData.donatorImage} alt="Donator" className="w-16 h-16 rounded-full border-2 border-orange-500" />
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={formData.donatorName}
                disabled
                className="w-full bg-gray-700/50 p-2 rounded-md border border-gray-600 cursor-not-allowed"
              />
              <input
                type="email"
                value={formData.donatorEmail}
                disabled
                className="w-full bg-gray-700/50 p-2 rounded-md border border-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

      
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Food Name</label>
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700/50 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Food Quantity</label>
              <input
                type="text"
                name="foodQuantity"
                value={formData.foodQuantity}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700/50 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Food Image URL</label>
              <input
                type="url"
                name="foodImage"
                value={formData.foodImage}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700/50 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Pickup Location</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700/50 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Expiration Date</label>
              <input
                type="date"
                name="expireDate"
                value={formData.expireDate}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700/50 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700/50 text-white"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 font-bold text-black bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-orange-500/50"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
}
