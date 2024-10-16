import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  updateUserPassword,
} from "./profile.controller.js";
import authenticateUser from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Récupérer le profil utilisateur
router.get("/", authenticateUser, getUserProfile);

// Mettre à jour le profil utilisateur
router.put("/", authenticateUser, upload.single("avatar"), updateUserProfile);

// Supprimer le compte utilisateur
router.delete("/", authenticateUser, deleteUserAccount);

// Route pour mettre à jour le mot de passe
router.put("/password", authenticateUser, updateUserPassword);

export default router;
