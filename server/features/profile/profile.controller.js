import User from "../users/users.model.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import crypto from "crypto"; // Pour générer des tokens sécurisés
import sendEmail from "../utils/sendEmail.js"; // Assurez-vous d'avoir une fonction pour envoyer des emails

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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Erreur lors de la récupération du profil utilisateur",
    });
  }
};

// Mise à jour du profil utilisateur
const updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { pseudo, email, bio } = req.body;
  let avatar;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Utilisateur non trouvé" });
    }

    // Vérifie si un fichier d'avatar a été uploadé
    if (req.file) {
      avatar = `/uploads/${req.file.filename}`; // Par exemple, une URL basée sur le fichier téléchargé
      user.avatar = avatar;
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
        avatar: user.avatar, // Inclure l'avatar mis à jour
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

// Mise à jour du mot de passe
const updateUserPassword = async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'ancien mot de passe est correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Ancien mot de passe incorrect" });
    }

    // Mettre à jour le mot de passe
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erreur lors de la mise à jour du mot de passe" });
  }
};

// Réinitialisation du mot de passe - Envoi de l'email
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Utilisateur non trouvé" });
    }

    // Générer un jeton de réinitialisation
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Ajouter le token à l'utilisateur avec une date d'expiration
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // Créer un lien de réinitialisation
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Envoi de l'email
    await sendEmail({
      to: user.email,
      subject: "Réinitialisation du mot de passe",
      text: `Vous avez demandé une réinitialisation de mot de passe. Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "Email de réinitialisation envoyé" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Erreur lors de la demande de réinitialisation de mot de passe",
    });
  }
};

// Réinitialisation du mot de passe - Changement du mot de passe
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Hash du token pour comparaison avec la base de données
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Trouver l'utilisateur correspondant au token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Vérifier si le token est toujours valide
    });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Token invalide ou expiré" });
    }

    // Mettre à jour le mot de passe
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined; // Supprimer le token après utilisation
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erreur lors de la réinitialisation du mot de passe" });
  }
};

export {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  updateUserPassword,
  requestPasswordReset,
  resetPassword,
};
