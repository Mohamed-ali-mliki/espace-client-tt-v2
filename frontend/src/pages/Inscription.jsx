// frontend/src/pages/Inscription.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Login.css"; // utilise le CSS unifié

/**
 * Composant d'inscription
 * Permet à un nouvel utilisateur de créer un compte
 */
const Inscription = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Gestionnaire de changement pour tous les champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // Validation et soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Nom requis";
    if (!formData.prenom) newErrors.prenom = "Prénom requis";
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mots de passe non identiques";
    if (!formData.termsAccepted) newErrors.termsAccepted = "Accepter les conditions";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Appel à l'API d'inscription
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          password: formData.password,
          telephone: formData.telephone,
        }
      );

      // Stockage des informations après inscription
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setSuccessMessage("Compte créé avec succès !");
      // Redirection vers la page d'abonnement après un court délai
      setTimeout(() => navigate("/subscriptions"), 1500);
    } catch (error) {
      alert(error.response?.data?.message || "Erreur d'inscription");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Inscription</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
        />
        {errors.nom && <small>{errors.nom}</small>}

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
        />
        {errors.prenom && <small>{errors.prenom}</small>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small>{errors.email}</small>}

        <input
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          value={formData.telephone}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <small>{errors.password}</small>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <small>{errors.confirmPassword}</small>}

        <label style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          Accepter les conditions
        </label>
        {errors.termsAccepted && <small>{errors.termsAccepted}</small>}

        <button type="submit">S'inscrire</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
      <p>
        Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
      </p>
    </div>
  );
};

export default Inscription;