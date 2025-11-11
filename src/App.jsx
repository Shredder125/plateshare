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
import "./App.css";

export default function App() {
  return (
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
          <>
            <Navbar />
            <AvailableFoods />
            <Footer />
          </>
        }
      />

      {/* Use _id as param to match MongoDB IDs */}
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
  );
}
