import express from "express";
import { updateUserProfile, deleteUserAccount } from "./profile.controller.js";
import authenticateUser from "../../middlewares/auth.middleware.js"; // Assurez-vous que ce middleware est correctement importé

const router = express.Router();

// Route pour mettre à jour le profil de l'utilisateur
router.put("/", authenticateUser, updateUserProfile);

// Route pour supprimer le compte utilisateur
router.delete("/", authenticateUser, deleteUserAccount);

export default router;
