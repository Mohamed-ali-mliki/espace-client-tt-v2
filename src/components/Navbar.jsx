import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; 

const navItems = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Inscription", path: "/inscription" },
  { name: "Subscriptions", path: "/subscriptions" }
];

const Navbar = () => {
  const onImageError = (e) => {
    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tunisie_Telecom_logo.svg/256px-Tunisie_Telecom_logo.svg.png";
    e.target.onerror = null;
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://upload.wikimedia.org/wikipedia/en/9/99/Tunisie_Telecom_Logo.png?v=3" alt="Logo" className="logo-img" onError={onImageError}/>
        <span className="brand-text">Espace Client</span>
      </div>
      <div className="navbar-right">
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
