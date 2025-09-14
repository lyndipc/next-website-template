import { SITE_CONFIG } from "@/config/site";

export default function FeaturesSection() {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="fade-in">Powerful Features</h2>
        <div className="features-grid">
          {SITE_CONFIG.features.list.map((feature, index) => (
            <article key={index} className="feature-card fade-in">
              <div className="feature-icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
