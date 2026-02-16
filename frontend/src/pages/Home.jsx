import React from "react";
import { Link } from "react-router-dom";
import "../components/Home.css";

const Home = () => {
  const services = [
    { icon: "📱", title: "My TT", desc: "Gérez vos services mobiles facilement.", link: "/subscriptions" },
    { icon: "💼", title: "Business", desc: "Solutions professionnelles pour les entreprises.", link: "/dashboard-client" },
    { icon: "🛠️", title: "Assistance", desc: "Support 24/7 pour vos problèmes techniques.", link: "/dashboard-client" },
  ];

  return (
    <div className="home-light">
      {/* Hero */}
      <section className="hero">
        <h1>Bienvenue sur <span>Tunisie Telecom</span></h1>
        <p>Gérez vos abonnements et services facilement, tout en un seul endroit.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">Se connecter</Link>
          <Link to="/inscription" className="btn-outline">Créer un compte</Link>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <h2>Nos Services</h2>
        <div className="services-grid">
          {services.map((s, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to={s.link} className="service-link">Découvrir →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Prêt à gérer vos services efficacement ?</h2>
        <Link to="/inscription" className="btn-primary btn-large">Créer un compte gratuit</Link>
      </section>
    </div>
  );
};

export default Home;
