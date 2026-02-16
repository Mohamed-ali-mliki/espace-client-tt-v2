// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import des routes
import authRoutes from "./routes/authRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // 👈 Nouvelle ligne

dotenv.config(); // Charge les variables d'environnement
connectDB();     // Connexion à MongoDB

const app = express();

app.use(cors());           // Autorise les requêtes cross-origin
app.use(express.json());   // Parse le JSON reçu

// Déclaration des routes
app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/users", userRoutes); // 👈 Nouvelle route

// Gestion des routes inexistantes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route introuvable" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));