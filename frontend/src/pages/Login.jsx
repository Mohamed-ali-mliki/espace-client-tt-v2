// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";

/**
 * Composant de connexion
 * Permet à l'utilisateur de s'authentifier et stocke ses informations dans localStorage
 */
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Gère les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à l'API de connexion
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Stockage des informations essentielles
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);   // important pour l'authentification
      localStorage.setItem("role", data.role);     // important pour le rôle (admin/client)

      alert("Connexion réussie !");
      navigate("/dashboard"); // redirection vers le tableau de bord
    } catch (error) {
      alert(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Connexion</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;