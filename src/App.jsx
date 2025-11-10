import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import FeaturedSection from "./components/FeaturedSection";
import CommunityStats from "./components/CommunityStats";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedSection />
      <CommunityStats />
      <HowItWorks />
      <Footer />
    </>
  );
}
