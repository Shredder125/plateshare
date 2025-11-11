import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import FeaturedSection from "./components/FeaturedSection";
import CommunityStats from "./components/CommunityStats";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AvailableFoods from "./pages/AvailableFoods";
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

      <Route path="/login" element={<Login />} />

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
