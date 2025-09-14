import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";
import PrivacyClientScripts from "@/components/PrivacyClientScripts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Next.js Website Template",
  description: "This is a demonstration website.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />
      <PrivacyPolicyContent />
      <Footer />
      <PrivacyClientScripts />
    </main>
  );
}
