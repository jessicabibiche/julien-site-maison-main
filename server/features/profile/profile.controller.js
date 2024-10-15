import User from "../users/users.model.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

// Récupération du profil utilisateur
const getUserProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId).select("-password"); // Ne pas inclure le mot de passe
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Utilisateur non trouvé" });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Erreur lors de la récupération du profil utilisateur",
      });
  }
};
// Mise à jour du profil utilisateur
const updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { pseudo, email, bio } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour uniquement les champs fournis
    if (pseudo) user.pseudo = pseudo;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    // Sauvegarder les modifications
    await user.save();

    return res.status(StatusCodes.OK).json({
      message: "Profil mis à jour avec succès",
      user: {
        pseudo: user.pseudo,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erreur lors de la mise à jour du profil" });
  }
};

// Suppression du compte utilisateur
const deleteUserAccount = async (req, res) => {
  const { userId } = req.user;

  try {
    await User.findByIdAndDelete(userId);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erreur lors de la suppression du compte" });
  }
};

export { updateUserProfile, deleteUserAccount };
