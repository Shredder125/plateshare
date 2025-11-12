import { useState, useEffect, createContext, useContext } from "react";
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
import AddFood from "./pages/AddFood";
import ManageMyFoods from "./pages/ManageMyFoods";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

function Toast({ message, type, onClose }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-slide-in mb-2 ${
        type === "success"
          ? "bg-green-600"
          : type === "error"
          ? "bg-red-600"
          : "bg-blue-600"
      }`}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 font-bold"
      >
        ×
      </button>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || currentUser.email,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const toast = {
    success: (message) => showToast(message, "success"),
    error: (message) => showToast(message, "error"),
    info: (message) => showToast(message, "info"),
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={toast}>
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            <>
              <AvailableFoods />
              <Footer />
            </>
          }
        />
        <Route
          path="/add-food"
          element={
            <PrivateRoute>
              <AddFood />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/food/:_id"
          element={
            <PrivateRoute>
              {/* Pass user as prop */}
              <FoodDetails user={user} />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-my-foods"
          element={
            <PrivateRoute>
              <ManageMyFoods user={user} />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <>
              <ErrorPage />
              <Footer />
            </>
          }
        />
      </Routes>
      <div className="fixed top-4 right-4 z-[9999] max-w-sm">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
