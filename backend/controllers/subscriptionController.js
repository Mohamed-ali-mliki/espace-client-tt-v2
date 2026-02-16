// backend/controllers/subscriptionController.js
import Subscription from "../models/Subscription.js";
import UserSubscription from "../models/UserSubscription.js";

/**
 * Récupérer toutes les offres d'abonnement disponibles
 * Route : GET /api/subscriptions
 * Accès : Public
 */
export const getSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({});
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Souscrire un utilisateur à une offre
 * Route : POST /api/subscriptions/subscribe
 * Body : { userId, subscriptionId }
 * Accès : Privé (token requis)
 */
export const subscribeUser = async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;

    // Vérifier si l'utilisateur est déjà abonné à cette offre
    const existing = await UserSubscription.findOne({ userId, subscriptionId });
    if (existing) {
      return res.status(400).json({ message: "Vous êtes déjà abonné à cette offre" });
    }

    const newSub = await UserSubscription.create({ userId, subscriptionId });
    res.status(201).json(newSub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupérer les abonnements d'un utilisateur avec les dates de souscription
 * Route : GET /api/subscriptions/user/:userId
 * Accès : Privé (token requis)
 */
export const getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;
    // Rechercher tous les enregistrements UserSubscription pour cet utilisateur
    // et peupler les détails de l'abonnement (subscriptionId)
    const userSubs = await UserSubscription.find({ userId })
      .populate('subscriptionId')
      .sort({ createdAt: -1 }); // tri du plus récent au plus ancien

    // Construire un objet contenant les données de l'offre et la date de souscription
    const subscriptions = userSubs.map(us => ({
      _id: us.subscriptionId._id,
      name: us.subscriptionId.name,
      price: us.subscriptionId.price,
      img: us.subscriptionId.img,
      subscribedAt: us.createdAt, // date de souscription (provenant de UserSubscription)
    }));

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};