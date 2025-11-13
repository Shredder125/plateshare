import { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

const ProgressBarLoader = () => (
  <motion.div
    className="fixed top-0 left-0 right-0 z-[10000] h-1"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0, transition: { duration: 0.2, delay: 0.6 } }}
  >
    <motion.div
      className="h-full bg-gradient-to-r from-green-400 to-teal-500 shadow-xl"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.8, ease: "linear" }}
    />
  </motion.div>
);

const flashyVariants = {
  hidden: { y: 150, opacity: 0, scale: 0.9, rotateX: -15 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
      duration: 0.6,
    },
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const providerProfilePic =
          currentUser.photoURL ||
          currentUser.providerData[0]?.photoURL ||
          "https://cdn-icons-png.flaticon.com/512/847/847969.png";

        let userName =
          currentUser.displayName || currentUser.email.split("@")[0];

        setUser({
          name: userName,
          email: currentUser.email,
          photoURL: providerProfilePic,
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

  const FlashyWrapper = ({ children, delay = 0, minHeight }) => (
    <motion.div
      variants={flashyVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px 300px 0px" }}
      transition={{ delay: delay }}
      style={{ minHeight: minHeight || "auto" }}
    >
      {children}
    </motion.div>
  );

  const hideNavPaths = ["/login", "/register"];
  const shouldShowNav = !hideNavPaths.includes(location.pathname);

  return (
    <ToastContext.Provider value={toast}>
      <div className="w-full h-screen overflow-x-hidden overflow-y-auto">
        {shouldShowNav && <Navbar user={user} />}
        {loading && <ProgressBarLoader />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <FlashyWrapper delay={0} minHeight="100vh">
                  <Hero />
                </FlashyWrapper>
                <FlashyWrapper delay={0.1}>
                  <FeaturedSection />
                </FlashyWrapper>
                <FlashyWrapper delay={0.2}>
                  <CommunityStats />
                </FlashyWrapper>
                <FlashyWrapper delay={0.1}>
                  <HowItWorks />
                </FlashyWrapper>
                <FlashyWrapper delay={0.2}>
                  <Footer />
                </FlashyWrapper>
              </>
            }
          />
          <Route
            path="/available-foods"
            element={
              <>
                <AvailableFoods API_BASE_URL={API_BASE_URL} />
                <Footer />
              </>
            }
          />
          <Route
            path="/add-food"
            element={
              <PrivateRoute>
                <AddFood API_BASE_URL={API_BASE_URL} />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/food/:_id"
            element={
              <PrivateRoute>
                <FoodDetails API_BASE_URL={API_BASE_URL} user={user} />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-my-foods"
            element={
              <PrivateRoute>
                <ManageMyFoods API_BASE_URL={API_BASE_URL} user={user} />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login API_BASE_URL={API_BASE_URL} />} />
          <Route path="/register" element={<Register API_BASE_URL={API_BASE_URL} />} />
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
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
