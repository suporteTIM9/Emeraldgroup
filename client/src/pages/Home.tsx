import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ClustersSection from "@/components/ClustersSection";
import JourneySection from "@/components/JourneySection";
import NewsSection from "@/components/NewsSection";
import MediaSlider from "@/components/MediaSlider";
import LogoMarquee from "@/components/LogoMarquee";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ClustersSection />
      <JourneySection />
      <NewsSection />
      <MediaSlider />
      <LogoMarquee />
      <ContactSection />
      <Footer />
    </div>
  );
}
