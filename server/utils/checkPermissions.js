import { checkPermissions } from "../utils/checkPermissions.js";

// Mettre à jour le profil utilisateur
const updateUserProfile = async (req, res) => {
  const { userId } = req.user; // L'utilisateur connecté
  const { id: ressourceUserId } = req.params; // L'ID de l'utilisateur à modifier

  // Vérifie que l'utilisateur est autorisé à modifier cette ressource
  checkPermissions(req.user, ressourceUserId);

  // Logique pour la mise à jour du profil
  // ...
};
