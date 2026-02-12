// src/pages/Login.jsx
import React, { useState } from "react";
import "../components/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق تسجيل الدخول مع backend
    console.log("Login data:", formData);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Connexion</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Entrez votre email"
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe"
          required
        />

        <button type="submit" className="login-btn">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
