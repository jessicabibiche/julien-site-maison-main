// Fonction pour supprimer un compte utilisateur
export const deleteUserAccount = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du compte utilisateur");
    }

    return response.json();
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};

// Fonction pour récupérer les informations du profil utilisateur
export const getUserProfile = async () => {
  try {
    const response = await fetch("/api/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

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
export const updateUserProfile = async (updatedProfile) => {
  try {
    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du profil utilisateur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};
