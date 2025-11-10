import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import FeaturedSection from "./components/FeaturedSection";
import CommunityStats from "./components/CommunityStats";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* Home page route */}
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

      {/* Login page route without Navbar */}
      <Route path="/login" element={<Login />} />

      {/* Optional catch-all route */}
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
