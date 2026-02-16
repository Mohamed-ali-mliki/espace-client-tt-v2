// backend/routes/userRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * GET /api/users
 * Récupère la liste de tous les utilisateurs
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /api/users
 * Crée un nouvel utilisateur (admin)
 * Le corps de la requête doit contenir nom, prenom, email, (telephone optionnel), subscription optionnel
 */
router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, telephone, subscription } = req.body;
    const user = new User({ nom, prenom, email, telephone, subscription });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * PUT /api/users/:id
 * Met à jour un utilisateur existant
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /api/users/:id
 * Supprime un utilisateur
 */
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;