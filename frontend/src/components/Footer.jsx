// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: "fab fa-facebook-f", url: "https://facebook.com/tunisietelecom" },
    { icon: "fab fa-twitter", url: "https://twitter.com/tunisietelecom" },
    { icon: "fab fa-linkedin-in", url: "https://linkedin.com/company/tunisietelecom" },
    { icon: "fab fa-instagram", url: "https://instagram.com/tunisietelecom" },
  ];

  return (
    <footer className="footer-light">
      <div className="footer-container">
        <div className="footer-top">
          <span className="footer-logo">Tunisie Telecom</span>
          <p className="footer-desc">Leader des télécommunications en Tunisie</p>
          <div className="footer-social">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer">
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <Link to="/about">À propos</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/assistance">Assistance</Link>
        </div>

        <div className="footer-bottom">
          &copy; {year} Tunisie Telecom – Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default Footer;
