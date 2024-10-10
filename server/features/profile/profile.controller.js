import User from "../users/users.model.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnauthenticatedError } from "../../errors/index.js";

// Mise à jour du profil utilisateur
const updateUserProfile = async (req, res) => {
  const { userId } = req.user; // L'utilisateur connecté
  const { pseudo, email, bio, password } = req.body;

  try {
    // Récupération de l'utilisateur depuis la base de données
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("Utilisateur non trouvé");
    }

    // Met à jour les informations de profil
    user.name = pseudo || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    // Génération de l'avatar avec DiceBear
    user.avatar = `https://avatars.dicebear.com/api/avataaars/${user.name}.svg`;

    // Si un mot de passe est fourni, on le met à jour
    if (password) {
      user.password = password;
    }

    await user.save(); // Sauvegarde des modifications

    res
      .status(StatusCodes.OK)
      .json({ message: "Profil mis à jour avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erreur lors de la mise à jour du profil" });
  }
};

// Suppression du compte utilisateur
const deleteUserAccount = async (req, res) => {
  const { userId } = req.user;

  try {
    await User.findByIdAndDelete(userId);
    res.status(StatusCodes.OK).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erreur lors de la suppression du compte" });
  }
};

export { updateUserProfile, deleteUserAccount };
