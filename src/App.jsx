import { useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import FeaturedSection from "./components/FeaturedSection";
import CommunityStats from "./components/CommunityStats";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AvailableFoods from "./pages/AvailableFoods";
import FoodDetails from "./pages/FoodDetails";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

// Toast Context
const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

// Custom Toast Component
function Toast({ message, type, onClose }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-slide-in mb-2 ${
        type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"
      }`}
    >
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200 font-bold">
        ×
      </button>
    </div>
  );
}

export default function App() {
  const [toasts, setToasts] = useState([]);

  const toast = {
    success: (message) => showToast(message, "success"),
    error: (message) => showToast(message, "error"),
    info: (message) => showToast(message, "info"),
  };

  const showToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={toast}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <FeaturedSection />
              <CommunityStats />
              <HowItWorks />
              <Footer />
            </>
          }
        />

        <Route
          path="/available-foods"
          element={
            <PrivateRoute>
              <Navbar />
              <AvailableFoods />
              <Footer />
            </PrivateRoute>
          }
        />

        <Route
          path="/food/:_id"
          element={
            <>
              <Navbar />
              <FoodDetails />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Hero />
              <FeaturedSection />
              <CommunityStats />
              <HowItWorks />
              <Footer />
            </>
          }
        />
      </Routes>

      {/* Toast Container */}
      {/* UPDATE: Increased z-index to ensure toasts appear above all other content */}
      <div className="fixed top-4 right-4 z-[9999] max-w-sm">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}