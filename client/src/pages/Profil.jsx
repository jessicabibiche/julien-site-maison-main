import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../services/user.services";

const defaultAvatar = "/avatars/avatardefault.png"; // Avatar par défaut

const Profil = ({ setIsAuthenticated, setUserAvatar, setUserName }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar); // Avatar par défaut
  const [neonColor, setNeonColor] = useState("violet");
  const [avatarFile, setAvatarFile] = useState(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
        setPseudo(user.name);
        setEmail(user.email);
        setBio(user.bio);
        if (user.avatar) {
          setAvatar(user.avatar);
          setUserAvatar(user.avatar);
          setUseNeonEffect(false);
        } else {
          setUserAvatar(defaultAvatar);
        }
        setUserName(user.name);
      } catch (err) {
        setError("Impossible de charger le profil.");
      }
    };
    fetchUserProfile();
  }, [setUserAvatar, setUserName]);

  const handleFieldSubmit = async (field) => {
    try {
      setError("");
      setSuccess("");
      const updatedProfile = { pseudo, bio, email, password };

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
      setUserName(updatedUser.name);
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil utilisateur");
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
    <div className="p-8 max-w-lg mx-auto bg-gray-800 rounded-md">
      <h2 className="text-3xl font-bold mb-6">Mon Profil</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="flex items-center space-x-4 mb-4">
        <div
          className={`w-20 h-20 rounded-full ${
            useNeonEffect ? `neon-border-${neonColor}` : ""
          }`}
        >
          <img
            src={avatar || defaultAvatar}
            alt="Avatar actuel"
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>
        <button
          className="text-blue-500 underline"
          onClick={() => setShowAvatarModal(true)}
        >
          Modifier l'avatar
        </button>
      </div>

      <div>
        <label className="block text-white mb-2">Pseudo</label>
        <input
          className="w-full p-2 rounded"
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Votre pseudo"
        />
        <button
          onClick={() => handleFieldSubmit("pseudo")}
          className="bg-green-500 text-white p-2 mt-2 rounded w-full"
        >
          Modifier le pseudo
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-white mb-2">Email</label>
        <input
          className="w-full p-2 rounded"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
        />
        <button
          onClick={() => handleFieldSubmit("email")}
          className="bg-green-500 text-white p-2 mt-2 rounded w-full"
        >
          Modifier l'email
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-white mb-2">Bio</label>
        <textarea
          className="w-full p-2 rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Parlez de vous..."
        ></textarea>
        <button
          onClick={() => handleFieldSubmit("bio")}
          className="bg-green-500 text-white p-2 mt-2 rounded w-full"
        >
          Modifier la bio
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-white mb-2">Mot de passe</label>
        <input
          className="w-full p-2 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Votre nouveau mot de passe"
        />
        <button
          onClick={() => handleFieldSubmit("password")}
          className="bg-green-500 text-white p-2 mt-2 rounded w-full"
        >
          Modifier le mot de passe
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-white mb-2">
          Ou téléchargez votre propre avatar
        </label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div className="mt-4">
        <label className="block text-white mb-2">Couleur du néon</label>
        <select
          value={neonColor}
          onChange={(e) => handleNeonEffectChange(e.target.value)}
          className="w-full p-2 rounded"
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
