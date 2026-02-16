// backend/routes/subscriptionRoutes.js
import express from "express";
import { 
  getSubscriptions, 
  subscribeUser, 
  getUserSubscriptions 
} from "../controllers/subscriptionController.js";

const router = express.Router();

// Routes publiques
router.get("/", getSubscriptions);                     // GET toutes les offres

// Routes privées (normalement protégées par middleware d'authentification)
router.post("/subscribe", subscribeUser);               // POST souscrire à une offre
router.get("/user/:userId", getUserSubscriptions);      // GET les abonnements d'un utilisateur

export default router;