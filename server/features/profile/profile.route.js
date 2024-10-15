import express from "express";
import { updateUserProfile, deleteUserAccount } from "./profile.controller.js";
import authenticateUser from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Récupérer le profil utilisateur
router.get("/", authenticateUser, (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du profil utilisateur",
    });
  }
});

// Mettre à jour le profil utilisateur
router.put("/", authenticateUser, updateUserProfile);

// Supprimer le compte utilisateur
router.delete("/", authenticateUser, deleteUserAccount);

export default router;
