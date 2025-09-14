import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export default function FinalCTASection() {
  return (
    <section id="download" className="final-cta">
      <div className="container">
        <h2 className="fade-in">Ready to Get Started?</h2>
        <p className="fade-in">
          Join thousands of satisfied customers who have transformed their
          business with our solution. Start your free trial today and see the
          difference.
        </p>
        <div className="hero-buttons fade-in">
          <Link
            href={SITE_CONFIG.cta.primary.href}
            className="cta-button"
            aria-label={`${SITE_CONFIG.cta.primary.text} - ${SITE_CONFIG.name}`}
          >
            {SITE_CONFIG.cta.primary.text}
          </Link>
          <Link
            href={SITE_CONFIG.cta.secondary.href}
            className="secondary-button"
            aria-label={SITE_CONFIG.cta.secondary.text}
          >
            {SITE_CONFIG.cta.secondary.text}
          </Link>
        </div>
      </div>
    </section>
  );
}
