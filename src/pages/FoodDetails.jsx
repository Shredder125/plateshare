import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

Modal.setAppElement("#root");

export default function FoodDetails({ user }) {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [foodRequests, setFoodRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/foods/${_id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Food not found");
        }
        const data = await res.json();
        setFood(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (_id) fetchFood();
  }, [_id]);

  useEffect(() => {
    if (food && user && food.donatorEmail === user.email) {
      fetchFoodRequests();
    }
  }, [food, user]);

  const fetchFoodRequests = async () => {
    try {
      setLoadingRequests(true);
      const res = await axios.get(`http://localhost:5000/api/food-requests/${_id}`);
      setFoodRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/food-requests/${requestId}/accept`, {
        foodId: _id
      });
      
      toast.success("Request accepted!");
      
      const res = await fetch(`http://localhost:5000/api/foods/${_id}`);
      const updatedFood = await res.json();
      setFood(updatedFood);
      
      fetchFoodRequests();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to accept request");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/food-requests/${requestId}/reject`);
      
      toast.success("Request rejected!");
      fetchFoodRequests();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject request");
    }
  };

  const isAvailable = (food?.food_status || "").toLowerCase() === "available";

  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    if (!location.trim() || !reason.trim() || !contact.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to request food!");
      return;
    }

    if (!user.email || !user.name) {
      toast.error("User info incomplete. Please log in again.");
      return;
    }

    setSubmitting(true);

    try {
      console.log("FRONTEND: Sending request for foodId:", _id);
      console.log("Request payload:", {
        foodId: _id,
        userEmail: user.email,
        name: user.name,
        photoURL: user.photoURL || "",
        location: location.trim(),
        reason: reason.trim(),
        contactNo: contact.trim(),
      });

      const response = await axios.post(
        "http://localhost:5000/api/food-requests",
        {
          foodId: _id,
          userEmail: user.email,
          name: user.name,
          photoURL: user.photoURL || "",
          location: location.trim(),
          reason: reason.trim(),
          contactNo: contact.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("Request submitted successfully:", response.data);
      toast.success("Food request submitted successfully!");

      setIsModalOpen(false);
      setLocation("");
      setReason("");
      setContact("");
    } catch (err) {
      console.error("Food request error:", err);

      if (err.response) {
        console.error("Response error:", err.response.status, err.response.data);
        toast.error(err.response.data?.message || "Failed to submit request");
      } else if (err.request) {
        console.error("Request made but no response received");
        toast.error("No response from server. Check if backend is running on localhost:5000");
      } else {
        console.error("Error message:", err.message);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!submitting) {
      setIsModalOpen(false);
      setLocation("");
      setReason("");
      setContact("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-400 text-xl font-semibold animate-pulse">
            Loading food details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-red-500/30 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/50">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-400">Oops! Something went wrong</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => navigate("/available-foods")}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold rounded-full hover:from-orange-400 hover:to-yellow-400 transition-all shadow-lg hover:shadow-orange-500/50 hover:scale-105"
          >
            Browse Available Foods
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user && food && food.donatorEmail === user.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 py-16 relative">
      <Toaster position="top-right" />
      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/available-foods")}
          className="group flex items-center gap-2 mb-8 text-gray-400 hover:text-orange-400 transition-colors"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Available Foods</span>
        </button>

        <div className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
          <div className="relative h-72 sm:h-96 md:h-[32rem] w-full overflow-hidden">
            <img
              src={food.foodImage || "https://via.placeholder.com/600x400"}
              alt={food.foodName}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            {isAvailable ? (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span className="text-white text-sm font-bold">Available Now</span>
              </div>
            ) : (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="text-white text-sm font-bold">Not Available</span>
              </div>
            )}
            
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl">
                {food.foodName}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Quantity</p>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                      {food.foodQuantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Donated by</p>
                    <p className="text-xl font-bold text-white">{food.donatorName || "Anonymous"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Pickup Location</p>
                    <p className="text-xl font-bold text-white">{food.pickupLocation || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Expires On</p>
                    <p className="text-xl font-bold text-white">
                      {food.expireDate ? new Date(food.expireDate).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {food.additionalNotes && food.additionalNotes !== "None" && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-orange-400 mb-2">Additional Notes</h3>
                    <p className="text-gray-300 leading-relaxed">{food.additionalNotes}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                if (!user) {
                  toast.error("Please log in to request food");
                  return;
                }
                setIsModalOpen(true);
              }}
              className="group relative w-full py-4 rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-black font-bold text-lg hover:from-orange-400 hover:via-yellow-300 hover:to-orange-400 transition-all shadow-2xl hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105"
              disabled={!isAvailable}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isAvailable ? (
                  <>
                    Request This Food
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                ) : (
                  "Currently Not Available"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {isOwner && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Food Requests</h2>
                
                {loadingRequests ? (
                  <div className="flex justify-center py-8">
                    <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : foodRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No requests yet for this food.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/20">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-400">Requester Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-400">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-400">Location</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-400">Reason</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-400">Contact</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-orange-400">Status</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-orange-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foodRequests.map((request) => (
                          <tr key={request._id} className="border border-gray-700 hover:bg-gray-800/30 transition-colors">
                            <td className="px-4 py-3 text-sm text-white">{request.requesterName}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{request.requesterEmail}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{request.location}</td>
                            <td className="px-4 py-3 text-sm text-gray-300 max-w-xs truncate">{request.reason}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{request.contactNo}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                request.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                                request.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {request.status === 'pending' && (
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={() => handleAcceptRequest(request._id)}
                                    className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => handleRejectRequest(request._id)}
                                    className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold rounded-lg hover:from-red-600 hover:to-rose-600 transition-all"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="max-w-lg mx-auto mt-24 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl outline-none border border-gray-700"
        overlayClassName="fixed inset-0 bg-black/70 flex justify-center items-start z-50 px-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Request This Food</h2>
          <button
            onClick={handleModalClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={submitting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleRequestSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Location <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 123 Main St, City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Why do you need this food? <span className="text-red-400">*</span>
            </label>
            <textarea
              placeholder="Please describe your situation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all min-h-[100px] resize-y"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contact Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g., +1234567890"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold rounded-lg hover:from-orange-400 hover:to-yellow-400 transition-all shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}