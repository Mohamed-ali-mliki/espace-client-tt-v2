import mongoose from "mongoose";

/**
 * Schéma pour lier un utilisateur à un abonnement souscrit
 */
const userSubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // Référence vers l'utilisateur
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true }, // Référence vers l'offre
}, { timestamps: true });

const UserSubscription = mongoose.model("UserSubscription", userSubscriptionSchema);
export default UserSubscription;