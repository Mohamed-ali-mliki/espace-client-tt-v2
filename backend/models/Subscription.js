import mongoose from "mongoose";

/**
 * Schéma pour les offres d'abonnement disponibles
 */
const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Nom de l'offre
  price: { type: String, required: true },     // Prix (ex: "dt10")
  img: { type: String },                        // URL de l'image (optionnel)
}, { timestamps: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;