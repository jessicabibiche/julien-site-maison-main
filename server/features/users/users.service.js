import User from "./users.model.js";

// Crée un nouvel utilisateur dans la base de données
const createUser = (data) => {
  return User.create(data); // Utilisation de `create` pour créer un utilisateur
};

// Récupère un utilisateur par ses critères (par exemple, par email)
const getUser = (options) => {
  return User.findOne(options); // Recherche l'utilisateur par ses options (email)
};

export { createUser, getUser };
