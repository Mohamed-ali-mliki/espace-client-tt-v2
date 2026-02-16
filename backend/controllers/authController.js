// backend/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/* ===============================
   Générer le token JWT
================================= */
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET n'est pas défini dans les variables d'environnement");
  }
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/* ===============================
   Inscription d'un utilisateur
   Route : POST /api/auth/register
================================= */
export const registerUser = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET n'est pas défini");
    }

    const { nom, prenom, email, password, telephone } = req.body;

    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs obligatoires (nom, prénom, email, mot de passe).",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const userId = new mongoose.Types.ObjectId();
    const token = generateToken(userId);

    const user = await User.create({
      _id: userId,
      nom,
      prenom,
      email,
      password,
      telephone: telephone || "",
      role: 'client' // 👈 rôle par défaut
    });

    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role, // 👈 retour du rôle
      token: token,
    });

  } catch (error) {
    console.error("❌ ERREUR REGISTER :", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: "Données invalides : " + messages.join(", ") });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }
    res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
};

/* ===============================
   Connexion d'un utilisateur
   Route : POST /api/auth/login
================================= */
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez fournir email et mot de passe." });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role, // 👈 retour du rôle
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

  } catch (error) {
    console.error("❌ ERREUR LOGIN :", error);
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};