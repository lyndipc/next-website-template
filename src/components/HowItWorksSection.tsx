import { SITE_CONFIG } from "@/config/site";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2 className="fade-in">How It Works</h2>
        <div className="steps">
          {SITE_CONFIG.process.map((step, index) => (
            <article key={index} className="step fade-in">
              <div className="step-number" aria-hidden="true">
                {step.number}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
