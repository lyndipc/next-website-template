import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TermsOfServiceContent from '@/components/TermsOfServiceContent';
import PrivacyClientScripts from '@/components/PrivacyClientScripts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Fake Company',
  description: 'This is a demonstration website for a fake company.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <main>
      <Header />
      <TermsOfServiceContent />
      <Footer />
      <PrivacyClientScripts />
    </main>
  );
}
