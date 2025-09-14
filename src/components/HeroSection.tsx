// Generic hero section component for your website template
// Customize the content through the SITE_CONFIG

import Link from "next/link";
import { SITE_CONFIG, CONTENT } from "@/config/site";

interface HeroSectionProps {
  // Optional props to override default content
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  showDemo?: boolean;
  backgroundImage?: string;
  variant?: "default" | "centered" | "split" | "minimal";
}

export default function HeroSection({
  title = CONTENT.hero.title,
  subtitle = CONTENT.hero.subtitle,
  description = CONTENT.hero.description,
  primaryCTA = SITE_CONFIG.cta.primary,
  secondaryCTA = SITE_CONFIG.cta.secondary,
  showDemo = true,
  backgroundImage,
  variant = "default",
}: HeroSectionProps = {}) {
  const heroClasses = `
    hero-section section-lg
    ${variant === "centered" ? "text-center" : ""}
    ${variant === "minimal" ? "section" : ""}
    ${backgroundImage ? "hero-with-bg" : ""}
  `.trim();

  return (
    <section
      className={heroClasses}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="container">
        {variant === "split" ? (
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="hero-content">
              <HeroContent
                title={title}
                subtitle={subtitle}
                description={description}
                primaryCTA={primaryCTA}
                secondaryCTA={secondaryCTA}
                variant={variant}
              />
            </div>
            <div className="hero-visual">
              <HeroVisual showDemo={showDemo} />
            </div>
          </div>
        ) : (
          <div className={variant === "centered" ? "max-w-4xl mx-auto" : ""}>
            <HeroContent
              title={title}
              subtitle={subtitle}
              description={description}
              primaryCTA={primaryCTA}
              secondaryCTA={secondaryCTA}
              variant={variant}
            />
            {showDemo && variant !== "minimal" && (
              <div className="hero-visual mt-16">
                <HeroVisual showDemo={showDemo} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Separate component for hero content to keep things organized
function HeroContent({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
}: {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  variant: string;
}) {
  return (
    <div className="hero-content">
      {subtitle && (
        <h2 className="hero-subtitle text-primary font-medium mb-4 animate-fade-in">
          {subtitle}
        </h2>
      )}

      <h1 className="hero-title text-6xl font-bold mb-6 animate-fade-in">
        {title}
      </h1>

      <p className="hero-description text-xl text-secondary mb-8 max-w-2xl animate-fade-in">
        {description}
      </p>

      <div className="hero-actions flex flex-wrap gap-4 animate-fade-in">
        <Link
          href={primaryCTA.href}
          className="btn btn-primary btn-lg"
          aria-label={`${primaryCTA.text} - ${SITE_CONFIG.name}`}
        >
          {primaryCTA.text}
        </Link>

        <Link
          href={secondaryCTA.href}
          className="btn btn-secondary btn-lg"
          aria-label={secondaryCTA.text}
        >
          {secondaryCTA.text}
        </Link>
      </div>

      {/* Trust indicators */}
      <div className="hero-trust mt-8 text-sm text-muted animate-fade-in">
        <p>✓ No credit card required ✓ Free 14-day trial ✓ Cancel anytime</p>
      </div>
    </div>
  );
}

// Visual component - customize this for your specific use case
function HeroVisual({ showDemo }: { showDemo: boolean }) {
  if (!showDemo) return null;

  return (
    <div className="hero-visual-container animate-fade-in">
      {/* Simple illustration placeholder */}

      <div className="hero-illustration">
        <div className="illustration-placeholder bg-primary-alpha rounded-2xl p-16 text-center">
          <div className="text-8xl mb-4">🚀</div>
          <p className="text-xl text-muted">Your product visualization here</p>
        </div>
      </div>

      {/* Option 2: Video placeholder */}
      {/*
      <div className="hero-video">
        <div className="video-placeholder bg-gray-100 rounded-2xl aspect-video flex items-center justify-center">
          <button className="btn btn-primary btn-lg">
            ▶️ Watch Demo
          </button>
        </div>
      </div>
      */}
    </div>
  );
}

// CSS for hero section (add to your theme.css or component styles)
const heroStyles = `
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, var(--primary-alpha) 0%, transparent 70%);
  pointer-events: none;
}

.hero-with-bg {
  color: var(--text-white);
}

.hero-with-bg .hero-title,
.hero-with-bg .hero-description {
  color: var(--text-white);
}

.hero-title {
  background: linear-gradient(135deg, var(--text-primary), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.hero-with-bg .hero-title {
  background: linear-gradient(135deg, var(--text-white), var(--white));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.browser-mockup {
  max-width: 800px;
  margin: 0 auto;
  background: var(--white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
}

.browser-header {
  background: var(--gray-100);
  padding: var(--space-3) var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  border-bottom: 1px solid var(--border-light);
}

.browser-dots {
  display: flex;
  gap: var(--space-2);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28ca42; }

.address-bar {
  flex: 1;
  background: var(--white);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}

.address-bar-text {
  color: var(--text-muted);
  font-size: var(--text-sm);
  font-family: var(--font-family-mono);
}

.browser-content {
  padding: var(--space-16);
  text-align: center;
  background: var(--bg-primary);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-content {
  max-width: 400px;
}

.demo-icon {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .hero-section .grid-cols-2 {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .hero-title {
    font-size: var(--text-4xl);
  }

  .hero-description {
    font-size: var(--text-lg);
  }

  .hero-actions {
    justify-content: center;
  }
}
`;

// Export the styles if you're using CSS-in-JS
export { heroStyles };
