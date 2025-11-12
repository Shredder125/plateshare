import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useToast } from "../App";

Modal.setAppElement("#root");

export default function ManageMyFoods({ user }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (!user?.email) return;

    const fetchFoods = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/foods/donator/${user.email}`);
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
        toast.error("Failed to fetch your foods");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your food item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:5000/api/foods/${id}`, { method: "DELETE" });
        setFoods((prev) => prev.filter((f) => f._id !== id));
        toast.success("Food deleted successfully");
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Failed to delete food");
      }
    }
  };

  const openUpdateModal = (food) => {
    setSelectedFood(food);
    setModalIsOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/foods/${selectedFood._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedFood),
      });
      const updatedFood = await res.json();
      setFoods((prev) =>
        prev.map((f) => (f._id === updatedFood._id ? updatedFood : f))
      );
      setModalIsOpen(false);
      toast.success("Food updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update food");
    }
  };

  if (loading) return <p className="text-gray-300 p-4">Loading your foods...</p>;
  if (!foods.length) return <p className="text-gray-300 p-4">You have not added any foods yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Manage My Foods</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pickup Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Expire Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {foods.map((food) => (
              <tr key={food._id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{food.foodName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{food.foodQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{food.pickupLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{new Date(food.expireDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200 flex gap-2">
                  <button
                    onClick={() => openUpdateModal(food)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFood && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Update Food"
          className="bg-gray-900 text-white p-6 rounded-xl max-w-lg mx-auto mt-20 outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
        >
          <h2 className="text-xl font-bold mb-4">Update Food</h2>
          <form onSubmit={handleUpdateSubmit} className="space-y-3">
            <div>
              <label className="block text-gray-200 mb-1">Name</label>
              <input
                type="text"
                name="foodName"
                value={selectedFood.foodName}
                onChange={handleUpdateChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-1">Quantity</label>
              <input
                type="text"
                name="foodQuantity"
                value={selectedFood.foodQuantity}
                onChange={handleUpdateChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-1">Pickup Location</label>
              <input
                type="text"
                name="pickupLocation"
                value={selectedFood.pickupLocation}
                onChange={handleUpdateChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-1">Expire Date</label>
              <input
                type="date"
                name="expireDate"
                value={new Date(selectedFood.expireDate).toISOString().split("T")[0]}
                onChange={handleUpdateChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-200 mb-1">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={selectedFood.additionalNotes || ""}
                onChange={handleUpdateChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
