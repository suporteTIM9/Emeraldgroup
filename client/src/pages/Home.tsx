import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

const ClustersSection = lazy(() => import("@/components/ClustersSection"));
const JourneySection = lazy(() => import("@/components/JourneySection"));
const NewsSection = lazy(() => import("@/components/NewsSection"));
const MediaSlider = lazy(() => import("@/components/MediaSlider"));
const LogoMarquee = lazy(() => import("@/components/LogoMarquee"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Suspense fallback={null}>
        <ClustersSection />
        <JourneySection />
        <NewsSection />
        <MediaSlider />
        <LogoMarquee />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
}
