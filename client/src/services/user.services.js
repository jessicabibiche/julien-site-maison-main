// src/services/user.services.js
const baseUrl = import.meta.env.VITE_API_URL; // Assurez-vous que cette valeur est définie correctement dans .env

// Fonction pour supprimer un compte utilisateur
export const deleteUserAccount = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajout du token JWT
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du compte utilisateur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};

// Fonction pour récupérer les informations du profil utilisateur
export const getUserProfile = async () => {
  try {
    const response = await fetch(`${baseUrl}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    // Si le token est expiré ou invalide, déconnexion automatique
    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Session expirée, veuillez vous reconnecter");
    }

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du profil utilisateur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfile = async (updatedProfile, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append("pseudo", updatedProfile.pseudo);
    formData.append("email", updatedProfile.email);
    formData.append("bio", updatedProfile.bio);

    if (avatarFile) {
      formData.append("avatar", avatarFile); // Ajouter le fichier avatar s'il est sélectionné
    }

    const response = await fetch(`${baseUrl}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData, // Utilisation de FormData pour permettre l'envoi d'un fichier
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Session expirée, veuillez vous reconnecter");
    }

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du profil utilisateur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};
