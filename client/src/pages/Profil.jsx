import React, { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../services/user.services";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editField, setEditField] = useState(""); // Nouveau champ pour gérer quel élément est en modification
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        setPseudo(user.pseudo);
        setEmail(user.email);
        setBio(user.bio);
        setAvatar(
          user.avatar ||
            `https://avatars.dicebear.com/api/avataaars/${user.pseudo}.svg`
        );
      } catch (err) {
        setError("Impossible de charger le profil.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleFieldSubmit = async (field) => {
    try {
      const updatedProfile = { pseudo, email, bio, avatar };
      if (field === "password") {
        updatedProfile.password = password; // Met à jour uniquement le mot de passe si besoin
      }
      await updateUserProfile(updatedProfile);
      setSuccess(`Le champ ${field} a été mis à jour avec succès !`);
      setError("");
      setEditField(""); // Revenir à l'état initial après la modification
    } catch (err) {
      setError(`Erreur lors de la mise à jour du champ ${field}.`);
      setSuccess("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const generateNewAvatar = () => {
    const newAvatarUrl = `https://avatars.dicebear.com/api/avataaars/${pseudo}.svg`;
    setAvatar(newAvatarUrl);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        await deleteUserAccount();
        alert("Compte supprimé avec succès.");
        localStorage.removeItem("token");
        navigate("/inscription");
      } catch (err) {
        setError("Erreur lors de la suppression du compte.");
      }
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-800 rounded-md">
      <h2 className="text-3xl font-bold mb-6">Mon Profil Gamer</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Pseudo */}
      <div>
        <label className="block text-white mb-2">Pseudo</label>
        {editField === "pseudo" ? (
          <>
            <input
              className="w-full p-2 rounded"
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Votre pseudo"
            />
            <button
              onClick={() => handleFieldSubmit("pseudo")}
              className="bg-green-500 p-2 rounded mt-2"
            >
              Enregistrer
            </button>
          </>
        ) : (
          <>
            <p>{pseudo}</p>
            <button
              onClick={() => setEditField("pseudo")}
              className="bg-blue-500 p-2 rounded mt-2"
            >
              Modifier
            </button>
          </>
        )}
      </div>

      {/* Avatar */}
      <div>
        <label className="block text-white mb-2">Avatar</label>
        {avatar && (
          <img
            src={avatar}
            alt="Avatar"
            className="mb-4 rounded-full w-32 h-32"
          />
        )}
        {editField === "avatar" ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <button
              type="button"
              onClick={() => handleFieldSubmit("avatar")}
              className="bg-green-500 p-2 rounded mt-2"
            >
              Enregistrer
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditField("avatar")}
            className="bg-blue-500 p-2 rounded mt-2"
          >
            Modifier
          </button>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-white mb-2">Email</label>
        {editField === "email" ? (
          <>
            <input
              className="w-full p-2 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
            />
            <button
              onClick={() => handleFieldSubmit("email")}
              className="bg-green-500 p-2 rounded mt-2"
            >
              Enregistrer
            </button>
          </>
        ) : (
          <>
            <p>{email}</p>
            <button
              onClick={() => setEditField("email")}
              className="bg-blue-500 p-2 rounded mt-2"
            >
              Modifier
            </button>
          </>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <label className="block text-white mb-2">Nouveau mot de passe</label>
        {editField === "password" ? (
          <>
            <input
              className="w-full p-2 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
            />
            <button
              onClick={() => handleFieldSubmit("password")}
              className="bg-green-500 p-2 rounded mt-2"
            >
              Enregistrer
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditField("password")}
              className="bg-blue-500 p-2 rounded mt-2"
            >
              Modifier
            </button>
          </>
        )}
      </div>

      {/* Bio */}
      <div>
        <label className="block text-white mb-2">Bio</label>
        {editField === "bio" ? (
          <>
            <textarea
              className="w-full p-2 rounded"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Parlez de vous, de vos jeux préférés, etc."
            ></textarea>
            <button
              onClick={() => handleFieldSubmit("bio")}
              className="bg-green-500 p-2 rounded mt-2"
            >
              Enregistrer
            </button>
          </>
        ) : (
          <>
            <p>{bio}</p>
            <button
              onClick={() => setEditField("bio")}
              className="bg-blue-500 p-2 rounded mt-2"
            >
              Modifier
            </button>
          </>
        )}
      </div>

      {/* Supprimer le compte */}
      <button
        onClick={handleDeleteAccount}
        className="bg-red-500 text-white w-full p-2 mt-4 rounded hover:bg-red-400"
      >
        Supprimer mon compte
      </button>
    </div>
  );
};

export default Profil;
