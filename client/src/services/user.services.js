const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"; // Utilise la variable d'environnement ou un fallback sur localhost

// Fonction pour supprimer un compte utilisateur
export const deleteUserAccount = async () => {
  try {
    const response = await fetch(`${baseUrl}/profile`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du compte utilisateur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
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

    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Session expirée, veuillez vous reconnecter");
    }

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du profil utilisateur");
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil utilisateur :",
      error
    );
    throw error;
  }
};

// Fonction pour mettre à jour le profil utilisateur (pseudo, email, bio, avatar)
export const updateUserProfile = async (updatedProfile) => {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify(updatedProfile);

    const response = await fetch(`${baseUrl}/profile`, {
      method: "PUT",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du profil utilisateur");
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du profil utilisateur :",
      error
    );
    throw error;
  }
};

// Fonction pour mettre à jour le mot de passe de l'utilisateur
export const updateUserPassword = async (updatedPassword) => {
  try {
    const response = await fetch(`${baseUrl}/profile/password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPassword),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du mot de passe");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe :", error);
    throw error;
  }
};

// Fonction pour demander la réinitialisation du mot de passe
export const requestPasswordReset = async (email) => {
  try {
    const response = await fetch(`${baseUrl}/auth/request-password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la demande de réinitialisation du mot de passe"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la demande de réinitialisation du mot de passe :",
      error
    );
    throw error;
  }
};
