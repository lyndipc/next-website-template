import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import ClientScripts from "@/components/ClientScripts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fake Company | Next.js Website Template",
  description: "This is a website for demonstration purposes.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <FAQSection />
      <ContactSection />
      <FinalCTASection />
      <Footer />
      <ClientScripts />
    </main>
  );
}
