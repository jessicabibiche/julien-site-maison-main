// Fonction pour l'inscription
export const register = async (name, email, password) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      // Assure-toi que l'endpoint est correct
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }
  );
  const data = await response.json();
  console.log(data);

  if (!response.ok)
    throw new Error(data.message || "Erreur lors de l'inscription");
  return data;
};

// Fonction pour la connexion
export const login = async (email, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Erreur lors de la connexion");
  return data;
};
