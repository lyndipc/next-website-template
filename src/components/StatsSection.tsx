import { SITE_CONFIG } from "@/config/site";

export default function StatsSection() {
  return (
    <section className="stats" aria-label="Statistics">
      <div className="container">
        <div className="stats-grid">
          {SITE_CONFIG.stats.map((stat, index) => (
            <div key={index} className="stat-item fade-in">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
