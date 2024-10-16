import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUserAccount,
} from "../services/user.services";

const defaultAvatar = "/avatars/avatardefault.png"; // Avatar par défaut

const Profil = ({ setIsAuthenticated, setUserAvatar, setUserPseudo }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar); // Avatar par défaut
  const [neonColor, setNeonColor] = useState("violet");
  const [avatarFile, setAvatarFile] = useState(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [useNeonEffect, setUseNeonEffect] = useState(true);
  const navigate = useNavigate();

  const predefinedAvatars = Array.from(
    { length: 84 },
    (_, index) => `/avatars/avatar${index + 1}.jpg`
  );

  const handleNeonEffectChange = (color) => {
    if (color === "none") {
      setUseNeonEffect(false);
    } else {
      setUseNeonEffect(true);
      setNeonColor(color);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        setPseudo(user.pseudo || ""); // Récupérer et afficher le pseudo
        setEmail(user.email || ""); // Récupérer et afficher l'email
        setBio(user.bio || ""); // Récupérer et afficher la bio
        setAvatar(user.avatar || defaultAvatar); // Récupérer l'avatar
        setUserAvatar(user.avatar || defaultAvatar); // Mise à jour du context pour la navbar
        setUserPseudo(user.pseudo || ""); // Afficher le nom de l'utilisateur
      } catch (err) {
        setError("Impossible de charger le profil.");
      }
    };
    fetchUserProfile();
  }, [setUserAvatar, setUserPseudo]);

  const handleFieldSubmit = async () => {
    try {
      setError("");
      setSuccess("");
      const updatedProfile = { pseudo, bio, email };

      let avatarFileToUpload = avatarFile;

      if (selectedAvatar) {
        updatedProfile.avatar = selectedAvatar;
        avatarFileToUpload = null;
      }

      const updatedUser = await updateUserProfile(
        updatedProfile,
        avatarFileToUpload
      );
      setSuccess("Profil mis à jour avec succès !");
      if (updatedUser.avatar) {
        setAvatar(updatedUser.avatar);
        setUserAvatar(updatedUser.avatar);
        setUseNeonEffect(false);
      } else {
        setAvatar(avatar);
        setUserAvatar(avatar);
      }
      setUserPseudo(updatedUser.pseudo);
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil utilisateur");
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const updatedPassword = { password };
      await updateUserPassword(updatedPassword);
      setSuccess("Mot de passe mis à jour avec succès");
      setShowPasswordModal(false);
    } catch (error) {
      setError("Erreur lors de la mise à jour du mot de passe");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setSelectedAvatar(URL.createObjectURL(file));
      setAvatar(URL.createObjectURL(file));
      setUserAvatar(URL.createObjectURL(file));
      setUseNeonEffect(false);
    }
  };

  const handleAvatarSelection = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setAvatar(avatarUrl);
    setUserAvatar(avatarUrl);
    setUseNeonEffect(false);
    setShowAvatarModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        await deleteUserAccount();
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
      } catch (err) {
        setError("Erreur lors de la suppression du compte.");
      }
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-900 rounded-md shadow-lg neon-box">
      <h2 className="text-3xl font-bold mb-6 text-white neon-text">
        Mon Profil
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="flex items-center space-x-2 mb-4">
        <div
          className={`w-20 h-20 rounded-full cursor-pointer ${
            useNeonEffect ? `neon-border-${neonColor}` : ""
          }`}
          onClick={() => setShowAvatarModal(true)}
        >
          <img
            src={avatar || defaultAvatar}
            alt="Avatar actuel"
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>
      </div>

      <div className="relative mb-4">
        <label className="block text-white mb-2">Pseudo</label>
        <div className="relative">
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Votre pseudo"
          />
          <button className="absolute right-2 top-2">
            <img src="/avatars/crayon.png" alt="edit" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <label className="block text-white mb-2">Email</label>
        <div className="relative">
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
          />
          <button className="absolute right-2 top-2">
            <img src="/avatars/crayon.png" alt="edit" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <label className="block text-white mb-2">Bio</label>
        <div className="relative">
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Parlez de vous..."
          ></textarea>
          <button className="absolute right-2 top-2">
            <img src="/avatars/crayon.png" alt="edit" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-white mb-2">Mot de passe</label>
        <button
          className="bg-blue-500 text-white p-2 rounded w-full"
          onClick={() => setShowPasswordModal(true)}
        >
          Modifier le mot de passe
        </button>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Changer le mot de passe</h3>
            <input
              className="w-full p-2 border rounded"
              type="password"
              placeholder="Votre nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            {isCapsLockOn && (
              <p className="text-red-500">Caps Lock est activé</p>
            )}
            <button
              className="mt-4 bg-green-500 text-white p-2 rounded w-full"
              onClick={handlePasswordSubmit}
            >
              Sauvegarder
            </button>
            <button
              className="mt-2 bg-red-500 text-white p-2 rounded w-full"
              onClick={() => setShowPasswordModal(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <label className="block text-white mb-2">Couleur du néon</label>
        <select
          value={neonColor}
          onChange={(e) => handleNeonEffectChange(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="none">Aucun néon</option>
          <option value="violet">Violet</option>
          <option value="bleu">Bleu</option>
          <option value="vert">Vert</option>
          <option value="orange">Orange</option>
          <option value="jaune">Jaune</option>
          <option value="rouge">Rouge</option>
          <option value="rose">Rose</option>
        </select>
      </div>

      <button
        onClick={handleDeleteAccount}
        className="bg-red-500 text-white p-2 mt-4 rounded w-full"
      >
        Supprimer mon compte
      </button>

      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg max-w-md w-full max-h-[70vh] overflow-y-scroll">
            <h2 className="text-xl font-bold mb-4">Sélectionner un avatar</h2>

            <h3 className="text-lg font-semibold mb-2">Jeux vidéo</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {predefinedAvatars.slice(0, 28).map((avatarUrl, index) => (
                <img
                  key={index}
                  src={avatarUrl}
                  alt={`Avatar ${index + 1}`}
                  className="w-16 h-16 rounded-full cursor-pointer"
                  onClick={() => handleAvatarSelection(avatarUrl)}
                />
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-2">Manga</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {predefinedAvatars.slice(28, 56).map((avatarUrl, index) => (
                <img
                  key={index}
                  src={avatarUrl}
                  alt={`Avatar ${index + 1}`}
                  className="w-16 h-16 rounded-full cursor-pointer"
                  onClick={() => handleAvatarSelection(avatarUrl)}
                />
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-2">Autres</h3>
            <div className="grid grid-cols-4 gap-4">
              {predefinedAvatars.slice(56).map((avatarUrl, index) => (
                <img
                  key={index}
                  src={avatarUrl}
                  alt={`Avatar ${index + 1}`}
                  className="w-16 h-16 rounded-full cursor-pointer"
                  onClick={() => handleAvatarSelection(avatarUrl)}
                />
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Télécharger une image
            </h3>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange} // Cette fonction gère le téléchargement d'un fichier image
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowAvatarModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
